import Subscription from "../models/Subscription.js";
import Center from "../models/Center.js";
import Provider from "../models/Provider.js";

const createSubscription = async (req, res) => {
  try {
    const { center, planType, startDate, endDate, amount } = req.body;

    if (
      !center ||
      !planType ||
      !startDate ||
      !endDate ||
      amount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const centerExists = await Center.findById(center);

    if (!centerExists) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const subscription = await Subscription.create({
      parent: req.user._id,
      center,
      planType,
      startDate,
      endDate,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      parent: req.user._id,
    })
      .populate("center", "centerName city")
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

const getSubscriptionDetails = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate(
      "center",
      "centerName city monthlyFee",
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    if (subscription.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
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

const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // Ownership Check
    if (subscription.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Already Cancelled
    if (subscription.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Subscription already cancelled",
      });
    }

    // Only Active Subscription can be cancelled
    if (subscription.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "Only active subscriptions can be cancelled",
      });
    }

    subscription.status = "Cancelled";

    await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProviderSubscriptions = async (req, res) => {
  try {
    // Find Provider
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    // Find Provider Center
    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    // Fetch Subscriptions
    const subscriptions = await Subscription.find({
      center: center._id,
    })
      .populate("parent", "name email")
      .sort({
        createdAt: -1,
      });

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

const getProviderSubscriptionAnalytics = async (req, res) => {
  try {
    // Find Provider
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    // Find Center
    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    // Fetch subscriptions
    const subscriptions = await Subscription.find({
      center: center._id,
    });

    const totalSubscriptions = subscriptions.length;

    const activeSubscriptions = subscriptions.filter(
      (subscription) => subscription.status === "Active",
    ).length;

    const cancelledSubscriptions = subscriptions.filter(
      (subscription) => subscription.status === "Cancelled",
    ).length;

    const expiredSubscriptions = subscriptions.filter(
      (subscription) => subscription.status === "Expired",
    ).length;

    const totalRevenue = subscriptions
      .filter((subscription) => subscription.status === "Active")
      .reduce((sum, subscription) => sum + subscription.amount, 0);

    res.status(200).json({
      success: true,
      analytics: {
        totalSubscriptions,
        activeSubscriptions,
        cancelledSubscriptions,
        expiredSubscriptions,
        totalRevenue,
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
  createSubscription,
  getMySubscriptions,
  getSubscriptionDetails,
  cancelSubscription,
  getProviderSubscriptions,
  getProviderSubscriptionAnalytics,
};
