"use client";

import { useState, useEffect } from "react";

const BunnyVideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const API_KEY = "3649dd11-b97f-4ed5-a50761e42cb0-bf31-493d"; // <-- O'ZINGIZNING API KALITINGIZNI QO'YING
  const LIBRARY_ID = "388347"; // <-- O'ZINGIZNING LIBRARY ID QO'YING

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadVideo = async () => {
    if (!file) return alert("Iltimos, video tanlang!");
    setLoading(true);
    setProgress(0);
    setIsProcessing(true);

    try {
      // 1. Video ID yaratish
      const createRes = await fetch(
        `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", AccessKey: API_KEY },
          body: JSON.stringify({ title: file.name }),
        }
      );
      const createData = await createRes.json();
      const newVideoId = createData.guid;
      setVideoId(newVideoId);

      // 2. Video faylni yuklash
      const uploadUrl = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${newVideoId}`;
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { AccessKey: API_KEY },
        body: file,
      });

      setProgress(100);
      alert("Video yuklandi! Transcoding jarayoni boshlandi.");
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      alert("Yuklashda xatolik yuz berdi!");
      setIsProcessing(false);
    }
    setLoading(false);
  };

  // Transcoding holatini tekshirish
  useEffect(() => {
    if (!videoId) return;

    const checkStatus = async () => {
      const res = await fetch(
        `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`,
        {
          headers: { AccessKey: API_KEY },
        }
      );
      const data = await res.json();
      
      if (data.status === 3) {
        setIsProcessing(false);
      }
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [videoId]);

  return (
    <div className="p-6 max-w-lg mx-auto pt-16">
      <h2 className="text-xl font-bold mb-4">Bunny Stream Video Yuklash</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={uploadVideo}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Yuklanmoqda..." : "Yuklash"}
      </button>

      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded mt-4">
          <div
            className="bg-blue-500 text-xs leading-none py-1 text-center text-white"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {isProcessing && (
        <p className="mt-4 text-yellow-500">⏳ Video transcoding qilinmoqda...</p>
      )}

      {videoId && !isProcessing && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Yuklangan Video</h3>
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}`}
            width="800"
            height="450"
            allow="autoplay; encrypted-media"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default BunnyVideoUpload;
