import Center from "../models/Center.js";
import Provider from "../models/Provider.js";
import generateSlug from "../utils/generateSlug.js";

const createCenter = async (req, res) => {
  try {
    const {
      centerName,
      description,
      address,
      city,
      state,
      pincode,
      ageGroup,
      capacity,
      monthlyFee,
      openingTime,
      closingTime,
      is24Hours,
      facilities,
    } = req.body;

    if (
      !centerName ||
      !description ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !ageGroup ||
      !capacity ||
      !monthlyFee ||
      !openingTime ||
      !closingTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const existingCenter = await Center.findOne({
      provider: provider._id,
    });

    if (existingCenter) {
      return res.status(409).json({
        success: false,
        message: "Center already exists",
      });
    }

    const slug = generateSlug(centerName);

    const center = await Center.create({
      provider: provider._id,
      centerName,
      slug,
      description,
      address,
      city,
      state,
      pincode,
      ageGroup,
      capacity,
      monthlyFee,
      openingTime,
      closingTime,
      is24Hours,
      facilities,
    });

    res.status(201).json({
      success: true,
      message: "Center created successfully",
      center,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCenters = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Centers API Working",
  });
};

const getSingleCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Single Center API Working",
  });
};

const updateCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update Center API Working",
  });
};

const deleteCenter = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete Center API Working",
  });
};

export {
  createCenter,
  getCenters,
  getSingleCenter,
  updateCenter,
  deleteCenter,
};
