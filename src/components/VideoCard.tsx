import Link from "next/link";
import React from "react";

// Define a type for the video data
type VideoData = {
  title: string;
  thumbnailUrl: string;
  channelName: string;
  viewCount: string;
  createdAt: string;
};

// Example video data for illustration. In a real app, this would likely come from props or an API.
const videoData: VideoData = {
  title: "Sample Video Title",
  thumbnailUrl: "https://via.placeholder.com/210x118",
  channelName: "Channel Name",
  viewCount: "1.2M views",
  createdAt: "2 weeks ago",
};

// Define props for the VideoCard component. Here, we're making the video prop optional and providing a default value.
type VideoCardProps = {
  video?: VideoData;
};

const VideoCard: React.FC<VideoCardProps> = ({ video = videoData }) => {
  console.log(video.thumbnailUrl);
  return (
      <Link href={`/watch/${video.pk}`}>
    <div className=" rounded overflow-hidden  m-4">
      <img
        className="w-[300px] h-[200px] rounded-lg"
        src={
          video.thumbnailUrl
            ? video.thumbnailUrl
            : "https://images.unsplash.com/photo-1712246459367-f3a086f093df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="Thumbnail"
      />
      <div className="px-6 py-4">
          <div className="font-semibold font-md mb-2">{video.title}</div>
        {/* <p className="text-gray-700 text-base">
          {video.channelName}
        </p> */}
      </div>
    </div>
        </Link>
  );
};

export default VideoCard;
