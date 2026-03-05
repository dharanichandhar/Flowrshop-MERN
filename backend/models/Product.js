const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    category: { type: String, enum: ["flower", "garland"], required: true },
    stock: { type: Number, default: 50, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);