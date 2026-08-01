import razorpay from "../config/razorpay.js";
import crypto from "crypto";

import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";
import Center from "../models/Center.js";

const createOrder = async (req, res) => {
  try {
    const { bookingId, planType, center, startDate, endDate } = req.body;

    // Booking or Subscription validation
    if (!bookingId && !planType) {
      return res.status(400).json({
        success: false,
        message: "Booking or Subscription details are required",
      });
    }

    let amount = 0;
    let booking = null;

    // -----------------------------
    // Booking Payment
    // -----------------------------
    if (bookingId) {
      booking = await Booking.findById(bookingId).populate(
        "center",
        "monthlyFee",
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      // Booking owner validation
      if (booking.parent.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized booking access",
        });
      }

      // Booking approval validation
      if (booking.status !== "Approved") {
        return res.status(400).json({
          success: false,
          message: "Booking is not approved yet",
        });
      }

      // Already paid validation
      if (booking.paymentStatus === "Paid") {
        return res.status(400).json({
          success: false,
          message: "Booking has already been paid",
        });
      }

      // Duplicate payment validation
      const existingPayment = await Payment.findOne({
        booking: bookingId,
        status: {
          $in: ["Pending", "Success"],
        },
      });

      if (existingPayment) {
        return res.status(400).json({
          success: false,
          message: "Payment already exists for this booking",
        });
      }

      amount = booking.center.monthlyFee;
    }

    // -----------------------------
    // Subscription Payment
    // -----------------------------
    if (planType) {
      if (!center || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "Incomplete subscription information",
        });
      }

      const centerData = await Center.findById(center).select("monthlyFee");

      if (!centerData) {
        return res.status(404).json({
          success: false,
          message: "Center not found",
        });
      }

      amount = centerData.monthlyFee;
    }

    // -----------------------------
    // Razorpay Order
    // -----------------------------
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // -----------------------------
    // Save Payment
    // -----------------------------
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

      currency: order.currency,

      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Payment order created successfully",
      order,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // -----------------------------
    // Validate Request
    // -----------------------------
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // -----------------------------
    // Verify Razorpay Signature
    // -----------------------------
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

    // -----------------------------
    // Find Payment
    // -----------------------------
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // -----------------------------
    // Already Verified
    // -----------------------------
    if (payment.status === "Success") {
      return res.status(400).json({
        success: false,
        message: "Payment already verified",
      });
    }

    // -----------------------------
    // Update Payment
    // -----------------------------
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "Success";
    payment.paidAt = new Date();

    await payment.save();

    // -----------------------------
    // Booking Payment
    // -----------------------------
    if (payment.booking) {
      const booking = await Booking.findById(payment.booking);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      booking.paymentStatus = "Paid";

      await booking.save();
    }

    // -----------------------------
    // Subscription Payment
    // -----------------------------
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

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
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
      .populate({
        path: "booking",
        select: "childName bookingDate planType status paymentStatus center",
        populate: {
          path: "center",
          select: "centerName city",
        },
      })
      .populate({
        path: "subscription",
        select: "planType startDate endDate amount status center",
        populate: {
          path: "center",
          select: "centerName city",
        },
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      total: payments.length,

      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: "booking",
        populate: {
          path: "center",
          select: "centerName city monthlyFee",
        },
      })
      .populate({
        path: "subscription",
        populate: {
          path: "center",
          select: "centerName city monthlyFee",
        },
      });

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

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createOrder, verifyPayment, getMyPayments, getPaymentDetails };
