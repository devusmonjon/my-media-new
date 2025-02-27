import mongoose, { Types } from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    series_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Series",
    },
    season_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Season",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    trailer: {
        type: String,
        required: true,
    },
    published_year: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    video: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const Episode = mongoose.models.Episode || mongoose.model("Episode", episodeSchema);
export default Episode;