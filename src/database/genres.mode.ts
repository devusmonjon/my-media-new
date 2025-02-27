import mongoose from "mongoose";

const genresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Genres = mongoose.models.Genres || mongoose.model("Genres", genresSchema);
export default Genres;