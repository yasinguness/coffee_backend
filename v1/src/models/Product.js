const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      min: 6,
      max: 255,
    },
    size: {
      type: String,
      enum: ["S", "M", "L"],
      default: "M",
    },
    smallPrice: Number,
    largePrice: Number,
    isSweet: {
      type: String,
      enum: ["coffee", "sweet"],
      default: "coffee",
    },
    quantitiy: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
