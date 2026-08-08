import Center from "../models/Center.js";
import Provider from "../models/Provider.js";
import generateSlug from "../utils/generateSlug.js";
import cloudinary from "../config/cloudinary.js";

const createCenter = async (req, res) => {
  try {
    // ==========================================
    // Find Provider
    // ==========================================
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    console.log("\nProvider:");
    console.dir(provider, { depth: null });

    if (!provider) {
      console.log("❌ Provider profile not found");

      return res.status(404).json({
        success: false,
        message: "Provider profile not found.",
      });
    }

    console.log("Provider Verification Status:", provider.verificationStatus);

    // Check if provider already has a center
    const existingCenter = await Center.findOne({
      provider: provider._id,
    });

    if (existingCenter) {
      return res.status(400).json({
        success: false,
        message: "You have already created a daycare center.",
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
      pricePerDay,
      openingTime,
      closingTime,
      is24Hours,
      facilities,
      latitude,
      longitude,
      isFeatured,
      status,
    } = req.body;

    console.log("\nExtracted Request Data:");
    console.table({
      centerName,
      description,
      address,
      city,
      state,
      pincode,
      ageGroup,
      capacity,
      monthlyFee,
      pricePerDay,
      openingTime,
      closingTime,
      is24Hours,
      facilities,
      latitude,
      longitude,
      isFeatured,
      status,
    });

    // ==========================================
    // Validation
    // ==========================================
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
      !pricePerDay ||
      !openingTime ||
      !closingTime
    ) {
      console.log("❌ Validation Failed");

      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ==========================================
    // Generate Slug
    // ==========================================
    const slug = generateSlug(centerName);

    console.log("\nGenerated Slug:", slug);

    // ==========================================
    // Check Duplicate Slug
    // ==========================================
    const existingSlug = await Center.findOne({ slug });

    if (existingSlug) {
      console.log("❌ Slug already exists");

      return res.status(409).json({
        success: false,
        message: "A center with this name already exists.",
      });
    }

    // ==========================================
    // Process Images
    // ==========================================
    const centerImages =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    console.log("\nProcessed Images:");
    console.dir(centerImages, { depth: null });

    // ==========================================
    // Parse Facilities
    // ==========================================
    const parsedFacilities = facilities
      ? Array.isArray(facilities)
        ? facilities
        : JSON.parse(facilities)
      : [];

    console.log("\nParsed Facilities:");
    console.dir(parsedFacilities, { depth: null });

    // ==========================================
    // Create Center Payload
    // ==========================================
    const centerData = {
      provider: provider._id,
      centerName,
      slug,
      description,
      address,
      city,
      state,
      pincode,
      ageGroup,
      capacity: Number(capacity),
      monthlyFee: Number(monthlyFee),
      pricePerDay: Number(pricePerDay),
      openingTime,
      closingTime,
      is24Hours: is24Hours === "true" || is24Hours === true,
      facilities: parsedFacilities,
      location: {
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
      },
      isFeatured: isFeatured === "true" || isFeatured === true,
      status: status || "active",
      centerImages,
    };

    console.log("\nCenter Payload:");
    console.dir(centerData, { depth: null });

    // ==========================================
    // Save Center
    // ==========================================
    const center = await Center.create(centerData);

    console.log("\n✅ Center Created Successfully");
    console.dir(center, { depth: null });

    return res.status(201).json({
      success: true,
      message: "Center created successfully.",
      center,
    });
  } catch (error) {
    console.log("\n========== CREATE CENTER ERROR ==========");

    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);

    if (error.code) {
      console.log("Error Code:", error.code);
    }

    if (error.errors) {
      console.log("\nValidation Errors:");
      console.dir(error.errors, { depth: null });
    }

    console.log("\nStack Trace:");
    console.log(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL CENTERS (Public) Its only shows recents or active parents sides center .
// ===============================
const getCenters = async (req, res) => {
  try {
    const { city, state, ageGroup } = req.query;

    const filter = {
      status: "active",
    };

    if (city) {
      filter.city = city;
    }

    if (state) {
      filter.state = state;
    }

    if (ageGroup) {
      filter.ageGroup = ageGroup;
    }

    const centers = await Center.find(filter)
      .populate({
        path: "provider",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({
        createdAt: -1,
      });
    console.log("CENTERS FOUND:", centers.length);
    console.log(centers);
    res.status(200).json({
      success: true,
      total: centers.length,
      centers,
    });
  } catch (error) {
    console.log("GET CENTERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET MY CENTERS (Provider) only fetch after login provider center datas.
// ===============================
const getMyCenters = async (req, res) => {
  try {
    console.log("========== GET MY CENTERS ==========");

    console.log("USER:");
    console.dir(req.user, { depth: null });

    const provider = await Provider.findOne({
      user: req.user._id,
    });

    console.log("PROVIDER:");
    console.dir(provider, { depth: null });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const centers = await Center.find({
      provider: provider._id,
    });

    console.log("CENTERS:");
    console.dir(centers, { depth: null });

    return res.status(200).json({
      success: true,
      centers,
    });
  } catch (error) {
    console.log("========== GET MY CENTERS ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCenterById = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);

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

// const deleteCenter = async (req, res) => {
//   try {
//     const center = await Center.findById(req.params.id);

//     if (!center) {
//       return res.status(404).json({
//         success: false,
//         message: "Center not found",
//       });
//     }

//     await center.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Center deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const deleteCenter = async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
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

    await Center.findByIdAndDelete(center._id);

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
const getFeaturedCenters = async (req, res) => {
  try {
    const centers = await Center.find({
      status: "active",
      isFeatured: true,
    })
      .sort({ createdAt: -1 })
      .limit(6);

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

const getLatestCenters = async (req, res) => {
  try {
    const centers = await Center.find({
      status: "active",
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      centers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTopRatedCenters = async (req, res) => {
  try {
    const centers = await Center.find({
      status: "active",
    })
      .sort({
        rating: -1,
        reviewCount: -1,
      })
      .limit(6);

    res.status(200).json({
      success: true,
      centers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSimilarCenters = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Center not found",
      });
    }

    const centers = await Center.find({
      _id: { $ne: center._id },
      city: center.city,
      status: "active",
    })
      .sort({ rating: -1 })
      .limit(4);

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

const getCenterFilters = async (req, res) => {
  try {
    const cities = await Center.distinct("city", {
      status: "active",
    });

    const states = await Center.distinct("state", {
      status: "active",
    });

    const ageGroups = await Center.distinct("ageGroup", {
      status: "active",
    });

    res.status(200).json({
      success: true,
      filters: {
        cities,
        states,
        ageGroups,
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
  createCenter,
  getCenters,
  getMyCenters,
  getCenterById,
  getSingleCenter,
  getFeaturedCenters,
  getLatestCenters,
  getTopRatedCenters,
  getSimilarCenters,
  getCenterFilters,
  updateCenter,
  deleteCenter,
};
