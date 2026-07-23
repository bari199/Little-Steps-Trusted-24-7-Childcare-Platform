import mongoose from "mongoose";

const centerSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
      unique: true,
    },

    centerName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    ageGroup: {
      type: String,
      required: true,
      enum: ["0-2 Years", "2-5 Years", "5+ Years"],
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    monthlyFee: {
      type: Number,
      required: true,
      min: 0,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    is24Hours: {
      type: Boolean,
      default: false,
    },

    facilities: {
      type: [String],
      default: [],
    },

    centerImages: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Center", centerSchema);
