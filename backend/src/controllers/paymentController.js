import razorpay from "../config/razorpay.js";
import crypto from "crypto";

import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";

const createOrder = async (req, res) => {
  try {
    const { amount, bookingId, planType, center, startDate, endDate } =
      req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    if (!bookingId && !planType) {
      return res.status(400).json({
        success: false,
        message: "Booking or Subscription details are required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      parent: req.user._id,
      booking: bookingId || null,
      subscriptionData: planType
        ? {
            center,
            planType,
            startDate,
            endDate,
          }
        : null,
      razorpayOrderId: order.id,
      amount,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "Success";
    payment.paidAt = new Date();

    await payment.save();

    if (payment.booking) {
      await Booking.findByIdAndUpdate(payment.booking, {
        paymentStatus: "Paid",
      });
    }

    if (payment.subscriptionData) {
      const subscription = await Subscription.create({
        parent: payment.parent,

        center: payment.subscriptionData.center,

        planType: payment.subscriptionData.planType,

        startDate: payment.subscriptionData.startDate,

        endDate: payment.subscriptionData.endDate,

        amount: payment.amount,

        status: "Active",
      });

      payment.subscription = subscription._id;

      payment.subscriptionData = null;

      await payment.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      parent: req.user._id,
    })
      .populate("booking")
      .populate("subscription")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      total: payments.length,

      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("booking")
      .populate("subscription");

    if (!payment) {
      return res.status(404).json({
        success: false,

        message: "Payment not found",
      });
    }

    if (payment.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,

        message: "Unauthorized access",
      });
    }

    res.status(200).json({
      success: true,

      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export { createOrder, verifyPayment, getMyPayments, getPaymentDetails };
