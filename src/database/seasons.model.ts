import mongoose, { Types } from "mongoose";

const seasonSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    series_id: {
      type: Types.ObjectId,
      required: true,
      ref: "Series",
    },
  },
  { timestamps: true }
);

const Season = mongoose.models.Season || mongoose.model("Season", seasonSchema);
export default Season;