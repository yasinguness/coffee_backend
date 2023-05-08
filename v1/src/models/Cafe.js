const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Cafe = mongoose.model("cafe", CafeSchema);

module.exports = Cafe;
