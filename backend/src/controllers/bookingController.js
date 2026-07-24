import Booking from "../models/Booking.js";
import Center from "../models/Center.js";
import Provider from "../models/Provider.js";

const createBooking = async (req, res) => {
  try {
    const {
      center,
      childName,
      childAge,
      bookingDate,
      startTime,
      endTime,
      planType,
      specialInstructions,
    } = req.body;

    if (
      !center ||
      !childName ||
      childAge === undefined ||
      !bookingDate ||
      !startTime ||
      !endTime ||
      !planType
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const centerExists = await Center.findById(center);

    if (!centerExists) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const booking = await Booking.create({
      parent: req.user._id,
      center,
      childName,
      childAge,
      bookingDate,
      startTime,
      endTime,
      planType,
      specialInstructions,
    });

    res.status(201).json({
      success: true,
      message: "Booking request submitted successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      parent: req.user._id,
    })
      .populate("center", "centerName city")
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
const getProviderBookings = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const bookings = await Booking.find({
      center: center._id,
    })
      .populate("parent", "name email")
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
const approveBooking = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      center: center._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Approved";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking approved successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const rejectBooking = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      center: center._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Rejected";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  createBooking,
  getMyBookings,
  getProviderBookings,
  approveBooking,
  rejectBooking,
};
