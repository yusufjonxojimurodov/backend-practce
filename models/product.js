import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },       // nomi
    price: { type: Number, required: true },       // narxi
    description: { type: String, default: "" },    // tavsif
    image: { type: String, default: "" },          // rasm
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
