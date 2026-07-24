import Booking from "../models/Booking.js";
import Center from "../models/Center.js";

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

export { createBooking, getMyBookings };
