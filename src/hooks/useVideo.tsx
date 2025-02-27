import crypto from "crypto"

const useVideo = ({ videoId, libraryId }: { videoId: string; libraryId: string }) => {
  const API_KEY = "8cbc341a-99be-45f2-9859-89b2db6ec9a6";
  const EXPIRY_TIME = Math.floor(Date.now() / 1000) + 3600;

  const generateToken = (videoId: string): string => {
    const data = `${API_KEY}${videoId}${EXPIRY_TIME}`;
    return crypto.createHash("sha256").update(data).digest("hex");
  };

  const token = generateToken(videoId);
  const videoUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${token}&expires=${EXPIRY_TIME}`;

  return {
    video: videoUrl,
  };
};

export default useVideo;
