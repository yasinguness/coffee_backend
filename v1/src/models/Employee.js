const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    cafe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cafe",
    },
  },
  { timestamps: true, versionKey: false }
);

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;
