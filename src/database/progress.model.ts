import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video_id: { type: String, required: true },
    current_time: { type: Number, required: true },
  },
  { timestamps: true }
);

const Progress =
  mongoose.models.Progress || mongoose.model("Progress", progressSchema);
export default Progress;
