import mongoose, { Types } from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Categories = mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);
export default Categories;