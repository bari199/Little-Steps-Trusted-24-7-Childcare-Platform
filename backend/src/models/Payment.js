import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    subscriptionData: {
      type: Object,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      default: "Razorpay",
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Payment", paymentSchema);
