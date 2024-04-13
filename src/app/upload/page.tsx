"use client"
import React, { useState } from "react";
import axios from "axios";
import { ChangeEvent } from "react";
import { createVideoEntry } from "@/utils/dynamoDB";
import {Textarea} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Spinner} from "@nextui-org/react";
import toast from "react-hot-toast";
import SpinnerCircular from "@/components/ui/SpinnerCircular";

async function uploadToS3({title,file,description,thumbnail}) {
  // const formData = new FormData(e.target);

  // const file = formData.get("file");

  if (!file) {
    return null;
  }

  // @ts-ignore
  // const fileType = encodeURIComponent(file.type);

  const { data } = await axios.get(`/api/upload/${title}`);

  const { uploadUrl, key,thumbnailUrl,thumbnailKey } = data;
  console.log(thumbnailUrl)
  await axios.put(uploadUrl, file);
  await axios.put(thumbnailUrl,thumbnail)
  try{
    const dynamoResponse =await  createVideoEntry({title,author:"melbin",url:`${key}`,description,thumbnailUrl:`https://thumbnail-video-storage.s3.amazonaws.com/${thumbnailKey}`})
    console.log(dynamoResponse);

  }
  catch(e){
    console.log(e)
  }

  // return key;
}

const page = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnail,setThumbnail]=useState(null)
  const [description, setDescription] = React.useState("");
  const [isLoading,setIsLoading] = useState(false)
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try{
      setIsLoading(true)
      const key = await uploadToS3({title,file,description,thumbnail});
      toast.success("Successfully Uploaded")
    }
    catch(e){
      toast.error("Couldn't upload file")
    }
    finally{
      setIsLoading(false)
    }
    
  }
  return (
    <div className="w-[500px] mx-auto">
      <p className="font-semibold text-[20px] mt-20">Please select file to upload</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-10">
      <div className="flex flex-col gap-2">
          <label>
            Title:
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
              name="title"
              required
            />
         
        </div>
        <div>
          <label>
            Video:
            <Input
              type="file"
              accept="video/mp4"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{setFile(e.target.files ? e.target.files[0] : null);}}
              name="file"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Thumbnails:
            <Input
              type="file"
              accept="image/jpg"
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{setThumbnail(e.target.files ? e.target.files[0] : null);}}
              name="file"
              required
            />
          </label>
        </div>
        <div>

        <Textarea
        variant="faded"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-gray-800 border-3"
        value={description}
        onValueChange={setDescription}
      />
        </div>
        <Button type="submit" disabled={isLoading}>Upload{isLoading?<SpinnerCircular/>:<></>}</Button>
      </form>

    </div>
  );
};

export default page;
