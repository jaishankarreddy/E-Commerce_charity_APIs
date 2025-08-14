const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 30,
      maxlength: 100,
    },
    banner: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    charity_email: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    platform_fee: {
      type: Number,
      default: 10,
    },
    donation_fee: {
      type: Number,
      default: 70,
    },
    profit: {
      type: Number,
      default: 20,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "live", "closed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

let charity = mongoose.model("Charity", charitySchema);

module.exports = charity