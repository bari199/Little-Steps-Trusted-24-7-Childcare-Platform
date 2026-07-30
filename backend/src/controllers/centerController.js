import Center from "../models/Center.js";
import Provider from "../models/Provider.js";
import generateSlug from "../utils/generateSlug.js";
import cloudinary from "../config/cloudinary.js";
const createCenter = async (req, res) => {
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

    if (provider.verificationStatus !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Provider account is not approved yet.",
      });
    }

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
      latitude,
      longitude,
      isFeatured,
      status,
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

    const centerImages =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

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
      facilities: facilities
        ? Array.isArray(facilities)
          ? facilities
          : JSON.parse(facilities)
        : [],
      location: {
        latitude: latitude || null,
        longitude: longitude || null,
      },
      isFeatured: isFeatured === "true" || isFeatured === true,
      status: status || "active",
      centerImages,
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
  try {
    const { city, ageGroup, is24Hours } = req.query;

    const filter = {};

    if (city) filter.city = city;
    if (ageGroup) filter.ageGroup = ageGroup;

    if (is24Hours !== undefined) {
      filter.is24Hours = is24Hours === "true";
    }

    const centers = await Center.find(filter)
      .populate({
        path: "provider",
        populate: {
          path: "user",
          select: "name email",
        },
      })
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
    const center = await Center.findOne({
      slug: req.params.slug,
    }).populate({
      path: "provider",
      populate: {
        path: "user",
        select: "name email",
      },
    });

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

const updateCenter = async (req, res) => {
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
      _id: req.params.id,
      provider: provider._id,
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    if (req.body.centerName) {
      req.body.slug = generateSlug(req.body.centerName);
    }

    if (req.body.facilities) {
      req.body.facilities = Array.isArray(req.body.facilities)
        ? req.body.facilities
        : JSON.parse(req.body.facilities);
    }

    if (req.body.latitude !== undefined || req.body.longitude !== undefined) {
      req.body.location = {
        latitude: req.body.latitude ?? center.location?.latitude ?? null,
        longitude: req.body.longitude ?? center.location?.longitude ?? null,
      };

      delete req.body.latitude;
      delete req.body.longitude;
    }

    if (req.body.isFeatured !== undefined) {
      req.body.isFeatured =
        req.body.isFeatured === "true" || req.body.isFeatured === true;
    }

    if (req.files?.length) {
      // Delete old images
      for (const image of center.centerImages) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Save new images
      req.body.centerImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    const updatedCenter = await Center.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Center updated successfully",
      center: updatedCenter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    await center.deleteOne();

    res.status(200).json({
      success: true,
      message: "Center deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createCenter,
  getCenters,
  getSingleCenter,
  updateCenter,
  deleteCenter,
};
