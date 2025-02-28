import mongoose, { Types } from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
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
    genres: {
        type: [Types.ObjectId],
        required: false,
        ref: "Genres",
        default: [],
    },
    country: {
        type: Types.ObjectId,
        required: false,
        ref: "Countries",
        default: null,
    },
    tags: {
        type: [Types.ObjectId],
        required: false,
        ref: "Tags",
        default: [],
    },
    cover: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    casts: {
      type: [Types.ObjectId],
      required: false,
      ref: "Cast",
      default: [],
    },
    duration: {
        type: Number,
        required: true,
    },
    categories: {
        type: [Types.ObjectId],
        required: false,
        ref: "Categories",
        default: [],
    }
  },
  { timestamps: true }
);

const Series = mongoose.models.Series || mongoose.model("Series", seriesSchema);
export default Series;