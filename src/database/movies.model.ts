import mongoose, { Types } from "mongoose";

const moviesSchema = new mongoose.Schema(
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
    tags: {
        type: [Types.ObjectId],
        required: false,
        ref: "Tags",
        default: [],
    },
    country: {
        type: Types.ObjectId,
        required: false,
        ref: "Countries",
        default: null
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
    video: {
        type: String,
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

const Movies = mongoose.models.Movies || mongoose.model("Movies", moviesSchema);
export default Movies;