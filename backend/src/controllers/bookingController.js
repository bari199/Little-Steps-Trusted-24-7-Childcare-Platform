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

    // Validation
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

    console.log("Request Body:", req.body);

    // Check Center
    const centerExists = await Center.findById(center);

    if (!centerExists) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    console.log("Center Found:", centerExists);
    console.log("Monthly Fee:", centerExists.monthlyFee);

    // Calculate Amount
    let amount = 0;

    switch (planType) {
      case "Hourly":
        amount = Math.round(centerExists.monthlyFee / 160);
        break;

      case "Daily":
        amount = Math.round(centerExists.monthlyFee / 30);
        break;

      case "Monthly":
        amount = centerExists.monthlyFee;
        break;

      default:
        amount = centerExists.monthlyFee;
    }

    console.log("Calculated Amount:", amount);

    // Booking Data
    const bookingData = {
      parent: req.user._id,
      center,
      childName,
      childAge: Number(childAge),
      bookingDate,
      startTime,
      endTime,
      planType,
      specialInstructions: specialInstructions || "",
      amount,
    };

    console.log("Booking Data:", bookingData);

    // Create Booking
    const booking = await Booking.create(bookingData);

    return res.status(201).json({
      success: true,
      message: "Booking request submitted successfully",
      booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("center", "centerName city centerImages monthlyFee address")
      .populate("parent", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Parent or Provider are only see. apartform rest are not see.
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    let isProvider = false;

    if (provider) {
      const center = await Center.findOne({
        provider: provider._id,
      });

      if (center && center._id.toString() === booking.center._id.toString()) {
        isProvider = true;
      }
    }

    if (
      booking.parent._id.toString() !== req.user._id.toString() &&
      !isProvider
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
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

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      parent: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be cancelled",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
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
    console.log("========== getProviderBookings CONTROLLER HIT ==========");

    console.log("\n========== GET PROVIDER BOOKINGS ==========");

    console.log("Logged In User ID:", req.user._id.toString());

    // Find Provider
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    console.log("Provider Document:", provider);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    console.log("Provider ID:", provider._id.toString());

    // Find Center
    const center = await Center.findOne({
      provider: provider._id,
    });

    console.log("Center Document:", center);

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    console.log("Center ID:", center._id.toString());

    // Raw Booking Count
    const bookingCount = await Booking.countDocuments({
      center: center._id,
    });

    console.log("Total Bookings For Center:", bookingCount);

    // Raw Bookings
    const rawBookings = await Booking.find({
      center: center._id,
    });

    console.log("\n========== RAW BOOKINGS ==========");

    rawBookings.forEach((booking, index) => {
      console.log({
        serial: index + 1,
        bookingId: booking._id.toString(),
        center: booking.center.toString(),
        parent: booking.parent.toString(),
        child: booking.childName,
        createdAt: booking.createdAt,
      });
    });

    console.log("==================================");

    // Populate
    const bookings = await Booking.find({
      center: center._id,
    })
      .populate("parent", "name email")
      .sort({ createdAt: -1 });

    console.log("Returned Bookings:", bookings.length);

    res.status(200).json({
      success: true,
      total: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("GET PROVIDER BOOKINGS ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const approveBooking = async (req, res) => {
  try {
    console.log("Approve Booking ID:", req.params.id);
    console.log("Logged User:", req.user);

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    console.log("Provider:", provider);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const center = await Center.findOne({
      provider: provider._id,
    });

    console.log("Center:", center);

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

    console.log("Booking:", booking);

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
    console.error("APPROVE ERROR");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
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
  getBookingDetails,
  cancelBooking,
  getProviderBookings,
  approveBooking,
  rejectBooking,
};
