import mongoose from "mongoose";

const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    links: {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      required: false,
      default: []
    }
  },
  { timestamps: true }
);

const Cast = mongoose.models.Cast || mongoose.model("Cast", castSchema);
export default Cast;