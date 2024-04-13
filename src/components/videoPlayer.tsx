import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = (videoID:String) => {
  return (
    <div>
      <ReactPlayer controls url={`https://deafo668hdkn6.cloudfront.net/${videoID}`} />
    </div>
  )
}

export default VideoPlayer
