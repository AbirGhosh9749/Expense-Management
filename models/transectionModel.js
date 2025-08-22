const mongoose = require("mongoose");

// Define the schema
const transectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    reference: {
      type: String,
      required: [true, "Reference is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    type: {
      type: String,
      enum: ["income", "expense"], // ✅ Optional validation
      required: [true, "Type is required"],
    },
  },
  { timestamps: true }
);

// Export the model
const transectionModel = mongoose.model("transections", transectionSchema);

module.exports = transectionModel;
