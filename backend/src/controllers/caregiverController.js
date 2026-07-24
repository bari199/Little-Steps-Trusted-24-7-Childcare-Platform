import Caregiver from "../models/Caregiver.js";
import Center from "../models/Center.js";
import Provider from "../models/Provider.js";

const createCaregiver = async (req, res) => {
  try {
    const { fullName, qualification, experience, specialization } = req.body;

    if (!fullName || !qualification || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
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

    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const caregiver = await Caregiver.create({
      center: center._id,
      fullName,
      qualification,
      experience,
      specialization,
    });

    res.status(201).json({
      success: true,
      message: "Caregiver created successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find().populate(
      "center",
      "centerName city",
    );

    res.status(200).json({
      success: true,
      total: caregivers.length,
      caregivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id).populate(
      "center",
      "centerName city",
    );

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: "Caregiver not found",
      });
    }

    res.status(200).json({
      success: true,
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: "Caregiver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Caregiver updated successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: "Caregiver not found",
      });
    }

    await caregiver.deleteOne();

    res.status(200).json({
      success: true,
      message: "Caregiver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createCaregiver,
  getCaregivers,
  getSingleCaregiver,
  updateCaregiver,
  deleteCaregiver,
};
