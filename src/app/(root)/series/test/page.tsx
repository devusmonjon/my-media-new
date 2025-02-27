"use client"
import React from "react";
const videoId = "7b986b4f-5fdb-48a0-9e0e-6200ea569ecd";
const libraryId = "388347";
import useVideo from "@/hooks/useVideo";

const BunnyStreamPlayer = () => {
  const {video} = useVideo({libraryId, videoId});

  return (
    <div className="container mx-auto pt-16">
      <h2>Secure Bunny Stream Video</h2>
      <iframe
        src={video}
        allow="autoplay; encrypted-media"
        frameBorder={0}
        allowFullScreen
        className="w-full h-[80vh]"
      ></iframe>
    </div>
  );
};

export default BunnyStreamPlayer;
