"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import dynamic from "next/dynamic";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/store";
const page = () => {
  const [videoInfo, setVideoInfo] = useState({});
  const { videoID } = useParams();
  const { username, premium } = useUserStore();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getVideoInfo = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          `https://dqhtmhf7hl.execute-api.us-east-1.amazonaws.com/test/get-video/?id=${videoID}`
        );
        console.log(response.data);
        setVideoInfo(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getVideoInfo();
  }, []);
  console.log(videoInfo);
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(
          "https://rk11jp7quk.execute-api.us-east-1.amazonaws.com/test/fetch"
        );
        setVideoList(response.data);
      } catch (error) {}
    };
    getVideos();
  }, []);

  console.log(videoList);
  return (
    <div className="mx-auto flex  gap-20 lg:justify-between px-10">
      {loading ? (
        <div>loading</div>
      ) : premium && videoInfo?.premium ? (
        videoInfo && (
          <div className=" mt-10 items-center">
            {" "}
            {/* Tailwind classes for centering */}
            <video
              className="max-h-[400px] w-[800px] rounded-md"
              controls
              muted
              src={`https://deafo668hdkn6.cloudfront.net/${videoInfo.url.S}`}
            />
            <div className="flex justify-between mt-10 lg:px-10 w-full">
              <div className="text-left   ">
                <div className="font-bold text-[26px]">{videoInfo.title.S}</div>
                <p className="text-sm">{videoInfo.description?.S}</p>
              </div>
              <Button className="rounded-full">Subscribe</Button>
            </div>
          </div>
        )
      ) : videoInfo && videoInfo?.premium ? (
        <div className="mt-[150px] text-center">
          Sign in as premium user to view this video
        </div>
      ) : (
        <div className=" mt-10 items-center">
          {" "}
          {/* Tailwind classes for centering */}
          <video
            className="max-h-[400px] w-[800px] rounded-md"
            controls
            muted
            src={`https://deafo668hdkn6.cloudfront.net/${videoInfo.url.S}`}
          />
          <div className="flex justify-between mt-10 lg:px-10 w-full">
            <div className="text-left   ">
              <div className="font-bold text-[26px]">{videoInfo.title.S}</div>
              <p className="text-sm">{videoInfo.description?.S}</p>
            </div>
            <Button className="rounded-full">Subscribe</Button>
          </div>
        </div>
      )}
      <div className="hidden lg:flex lg:flex-col left-[30px]">
        {videoList.map((item) => {
          return <VideoCard video={item} />;
        })}
      </div>
    </div>
  );
};

export default page;
