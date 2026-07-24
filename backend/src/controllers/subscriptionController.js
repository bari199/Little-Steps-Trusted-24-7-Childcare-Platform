import Subscription from "../models/Subscription.js";
import Center from "../models/Center.js";

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

export { createSubscription, getMySubscriptions };
