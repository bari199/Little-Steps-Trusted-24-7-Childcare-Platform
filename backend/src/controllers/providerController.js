import Provider from "../models/Provider.js";

const createProviderProfile = async (req, res) => {
  try {
    const { phone, address, qualification, experience } = req.body;

    if (!phone || !address || !qualification || !experience) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProvider = await Provider.findOne({
      user: req.user._id,
    });

    if (existingProvider) {
      return res.status(409).json({
        success: false,
        message: "Provider profile already exists",
      });
    }

    const provider = await Provider.create({
      user: req.user._id,
      phone,
      address,
      qualification,
      experience,
    });

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    }).populate("user", "-password");

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
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

const updateProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Provider profile updated successfully",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createProviderProfile, getProviderProfile, updateProviderProfile };
