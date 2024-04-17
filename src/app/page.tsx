"use client"
import VideoCard from "@/components/VideoCard";
import { useUserStore } from "@/store/store";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const{username,premium}=useUserStore();

  const [videoList,setVideoList] = useState([])
  useEffect(()=>{
    const getVideos=async()=>{
      try {
        const response = await axios.get('https://rk11jp7quk.execute-api.us-east-1.amazonaws.com/test/fetch')
        setVideoList(response.data)
      } catch (error) {
        
      }
    }
    getVideos();
  },[])

  console.log(videoList)

  return (
    <div className="px-5 lg:px-44 py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
      {videoList
        .filter(video => premium || !video.premium) // Filter videos based on premium status
        .map(item => <VideoCard key={item.id} video={item} />) // Render VideoCard for each filtered video
      }
    </div>
  </div>
  );
}
