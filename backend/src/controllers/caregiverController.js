import Caregiver from "../models/Caregiver.js";
import Center from "../models/Center.js";
import Provider from "../models/Provider.js";

// ===============================
// CREATE CAREGIVER (Provider)
// ===============================
const createCaregiver = async (req, res) => {
  try {
    const { fullName, qualification, experience, specialization } = req.body;

    if (!fullName || !qualification || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // Find provider profile
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    // Find provider center
    const center = await Center.findOne({
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    // Image handling
    let profileImage = {
      url: "",
      public_id: "",
    };

    if (req.file) {
      profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const caregiver = await Caregiver.create({
      center: center._id,
      fullName,
      qualification,
      experience,
      specialization,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Caregiver created successfully",
      caregiver,
    });
  } catch (error) {
    console.log("CREATE CAREGIVER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL CAREGIVERS (Public)
// ===============================
const getCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find()
      .populate({
        path: "center",
        select: "centerName city",
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      total: caregivers.length,
      caregivers,
    });
  } catch (error) {
    console.log("GET CAREGIVERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET PROVIDER CAREGIVERS
// ===============================
const getProviderCaregivers = async (req, res) => {
  try {
    console.log("AUTH USER:", req.user);

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    console.log("PROVIDER:", provider);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const center = await Center.findOne({
      provider: provider._id,
    });

    console.log("CENTER:", center);

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const caregivers = await Caregiver.find({
      center: center._id,
    });

    res.status(200).json({
      success: true,
      caregivers,
    });
  } catch (error) {
    console.log("PROVIDER CAREGIVER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE CAREGIVER
// ===============================
const getSingleCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id).populate({
      path: "center",
      select: "centerName city",
    });

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
    console.log("GET SINGLE CAREGIVER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE CAREGIVER
// ===============================
const updateCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({
        success: false,
        message: "Caregiver not found",
      });
    }

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.profileImage = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedCaregiver = await Caregiver.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Caregiver updated successfully",
      caregiver: updatedCaregiver,
    });
  } catch (error) {
    console.log("UPDATE CAREGIVER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE CAREGIVER
// ===============================
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
    console.log("DELETE CAREGIVER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createCaregiver,
  getCaregivers,
  getProviderCaregivers,
  getSingleCaregiver,
  updateCaregiver,
  deleteCaregiver,
};
