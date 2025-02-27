import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Countries = mongoose.models.Countries || mongoose.model("Countries", countriesSchema);
export default Countries;