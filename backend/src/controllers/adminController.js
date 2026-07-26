import User from "../models/User.js";
import Provider from "../models/Provider.js";
import Center from "../models/Center.js";
import Caregiver from "../models/Caregiver.js";
import Booking from "../models/Booking.js";
import Subscription from "../models/Subscription.js";
import Payment from "../models/Payment.js";

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalParents,
      totalProviders,
      verifiedProviders,
      pendingProviders,
      totalCenters,
      totalCaregivers,
      totalBookings,
      pendingBookings,
      approvedBookings,
      rejectedBookings,
      totalSubscriptions,
      totalPayments,
      revenue,
    ] = await Promise.all([
      User.countDocuments({ role: "parent" }),

      User.countDocuments({ role: "provider" }),

      Provider.countDocuments({
        verificationStatus: "Approved",
      }),

      Provider.countDocuments({
        verificationStatus: "Pending",
      }),

      Center.countDocuments(),

      Caregiver.countDocuments(),

      Booking.countDocuments(),

      Booking.countDocuments({
        status: "Pending",
      }),

      Booking.countDocuments({
        status: "Approved",
      }),

      Booking.countDocuments({
        status: "Rejected",
      }),

      Subscription.countDocuments(),

      Payment.countDocuments({
        status: "Success",
      }),

      Payment.aggregate([
        {
          $match: {
            status: "Success",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalParents,
        totalProviders,
        verifiedProviders,
        pendingProviders,
        totalCenters,
        totalCaregivers,
        totalBookings,
        pendingBookings,
        approvedBookings,
        rejectedBookings,
        totalSubscriptions,
        totalPayments,
        revenue: revenue.length > 0 ? revenue[0].totalRevenue : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid status",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    user.status = status;

    await user.save();

    res.status(200).json({
      success: true,

      message: `User ${status} successfully`,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find()
      .populate("user", "name email role status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: providers.length,
      providers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPendingProviders = async (req, res) => {
  try {
    const providers = await Provider.find({
      verificationStatus: "pending",
    }).populate("user", "name email role status");

    res.status(200).json({
      success: true,

      total: providers.length,

      providers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getSingleProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!provider) {
      return res.status(404).json({
        success: false,

        message: "Provider not found",
      });
    }

    res.status(200).json({
      success: true,

      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const approveProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,

        message: "Provider not found",
      });
    }

    provider.verificationStatus = "approved";

    await provider.save();

    res.status(200).json({
      success: true,

      message: "Provider approved successfully",

      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const rejectProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,

        message: "Provider not found",
      });
    }

    provider.verificationStatus = "rejected";

    await provider.save();

    res.status(200).json({
      success: true,

      message: "Provider rejected successfully",

      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getAllCenters = async (req, res) => {
  try {
    const centers = await Center.find()
      .populate("provider", "businessName verificationStatus")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: centers.length,
      centers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleCenter = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id).populate(
      "provider",
      "businessName verificationStatus",
    );

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    res.status(200).json({
      success: true,
      center,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCenterStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const center = await Center.findById(req.params.id);

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    center.status = status;

    await center.save();

    res.status(200).json({
      success: true,
      message: "Center status updated successfully",
      center,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("parent", "name email")
      .populate("center", "centerName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("parent", "name email phone")
      .populate("center", "centerName address");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    // 👇 Ei jaygay validation add korbe
    const allowedStatus = [
      "Pending",
      "Approved",
      "Rejected",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const bookings = await Booking.find({
      status,
    })
      .populate("parent", "name email")
      .populate("center", "centerName");

    res.status(200).json({
      success: true,

      total: bookings.length,

      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getBookingsByPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.params;

    // 👇 Ei jaygay validation add korbe
    const allowedPaymentStatus = ["Pending", "Paid"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const bookings = await Booking.find({
      paymentStatus,
    })
      .populate("parent", "name email")
      .populate("center", "centerName");

    res.status(200).json({
      success: true,

      total: bookings.length,

      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("parent", "name email")
      .populate("center", "centerName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("parent", "name email")
      .populate("center", "centerName");

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubscriptionsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const allowedStatus = ["Pending", "Active", "Expired", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription status",
      });
    }

    const subscriptions = await Subscription.find({
      status,
    })
      .populate("parent", "name email")
      .populate("center", "centerName");

    res.status(200).json({
      success: true,

      total: subscriptions.length,

      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("parent", "name email")
      .populate("booking")
      .sort({ createdAt: -1 });

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

const getSinglePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("parent", "name email")
      .populate("booking");

    if (!payment) {
      return res.status(404).json({
        success: false,

        message: "Payment not found",
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

const getPaymentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const allowedPaymentStatus = ["Pending", "Success", "Failed"];

    if (!allowedPaymentStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const payments = await Payment.find({
      status,
    }).populate("parent", "name email");

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

const getOverviewReport = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProviders,
      totalCenters,
      totalCaregivers,
      totalBookings,
      totalSubscriptions,
      totalPayments,
    ] = await Promise.all([
      User.countDocuments(),
      Provider.countDocuments(),
      Center.countDocuments(),
      Caregiver.countDocuments(),
      Booking.countDocuments(),
      Subscription.countDocuments(),
      Payment.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      overview: {
        totalUsers,
        totalProviders,
        totalCenters,
        totalCaregivers,
        totalBookings,
        totalSubscriptions,
        totalPayments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRevenueReport = async (req, res) => {
  try {
    const payments = await Payment.find({
      status: "Success",
    });

    const totalRevenue = payments.reduce(
      (total, payment) => total + payment.amount,
      0,
    );

    res.status(200).json({
      success: true,

      totalTransactions: payments.length,

      totalRevenue,

      currency: "INR",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getBookingReport = async (req, res) => {
  try {
    const pending = await Booking.countDocuments({
      status: "Pending",
    });

    const approved = await Booking.countDocuments({
      status: "Approved",
    });

    const rejected = await Booking.countDocuments({
      status: "Rejected",
    });

    const completed = await Booking.countDocuments({
      status: "Completed",
    });

    const cancelled = await Booking.countDocuments({
      status: "Cancelled",
    });

    res.status(200).json({
      success: true,

      bookings: {
        pending,
        approved,
        rejected,
        completed,
        cancelled,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getSubscriptionReport = async (req, res) => {
  try {
    const pending = await Subscription.countDocuments({
      status: "Pending",
    });

    const active = await Subscription.countDocuments({
      status: "Active",
    });

    const expired = await Subscription.countDocuments({
      status: "Expired",
    });

    const cancelled = await Subscription.countDocuments({
      status: "Cancelled",
    });

    res.status(200).json({
      success: true,

      subscriptions: {
        pending,
        active,
        expired,
        cancelled,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export {
  getDashboardStats,
  getAllUsers,
  getAllCenters,
  getAllBookings,
  getSingleBooking,
  getBookingsByStatus,
  getBookingsByPaymentStatus,
  getSingleUser,
  getSingleCenter,
  updateCenterStatus,
  updateUserStatus,
  getAllProviders,
  getPendingProviders,
  getSingleProvider,
  approveProvider,
  rejectProvider,
  getAllSubscriptions,
  getSingleSubscription,
  getSubscriptionsByStatus,
  getAllPayments,
  getSinglePayment,
  getPaymentsByStatus,
  getOverviewReport,
  getRevenueReport,
  getBookingReport,
  getSubscriptionReport,
};
