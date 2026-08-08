import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Provider from "../models/Provider.js";
import generateToken from "../utils/generateToken.js";

// =============================
// Register Parent
// =============================
// const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Required Fields
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const formattedName = name.trim();
//     const formattedEmail = email.trim().toLowerCase();

//     // Validate Role
//     const userRole = role || "parent";

//     if (!["parent", "provider"].includes(userRole)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user role",
//       });
//     }

//     // Password Length
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters",
//       });
//     }

//     // Check Existing User
//     const existingUser = await User.findOne({
//       email: formattedEmail,
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     // Hash Password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create User
//     const user = await User.create({
//       name: formattedName,
//       email: formattedEmail,
//       password: hashedPassword,
//       role: userRole,

//       status: userRole === "provider" ? "pending" : "active",

//       isApproved: userRole === "provider" ? false : true,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Registration successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// =============================
// Register
// =============================
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      address,
      qualification,
      experience,
      governmentId,
    } = req.body;

    // -----------------------------
    // Basic Validation
    // -----------------------------
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const formattedName = name.trim();
    const formattedEmail = email.trim().toLowerCase();

    const userRole = role || "parent";

    if (!["parent", "provider"].includes(userRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Provider Required Fields
    if (userRole === "provider") {
      if (!phone || !address || !qualification || experience === undefined) {
        return res.status(400).json({
          success: false,
          message: "All provider fields are required",
        });
      }
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // -----------------------------
    // Existing User
    // -----------------------------
    const existingUser = await User.findOne({
      email: formattedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // -----------------------------
    // Hash Password
    // -----------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------
    // Create User
    // -----------------------------
    const user = await User.create({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
      role: userRole,

      status: userRole === "provider" ? "pending" : "active",

      isApproved: userRole === "provider" ? false : true,
    });

    // -----------------------------
    // Create Provider Profile
    // -----------------------------
    if (userRole === "provider") {
      await Provider.create({
        user: user._id,
        phone,
        address,
        qualification,
        experience: Number(experience),
        governmentId: governmentId || "",
        profileImage: req.file?.path || "",
        verificationStatus: "pending",
      });
    }

    // -----------------------------
    // Response
    // -----------------------------
    res.status(201).json({
      success: true,
      message:
        userRole === "provider"
          ? "Registration successful. Wait for admin approval."
          : "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =============================
// Login
// =============================
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const formattedEmail = email.trim().toLowerCase();

//     // Find User
//     const user = await User.findOne({
//       email: formattedEmail,
//     });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Compare Password
//     const isPasswordMatched = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatched) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Blocked User
//     if (user.status === "blocked") {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Your account has been blocked. Please contact the administrator.",
//       });
//     }

//     if (user.role === "provider" && !user.isApproved) {
//       return res.status(403).json({
//         success: false,
//         message: "Your provider account is waiting for admin approval.",
//       });
//     }

//     // Generate Token
//     const token = generateToken(user._id, user.role);

//     // Cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// =============================
// Login
// =============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const formattedEmail = email.trim().toLowerCase();

    // Find User
    const user = await User.findOne({
      email: formattedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check Password
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Blocked User
    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked by the administrator.",
      });
    }

    // Provider Verification
    if (user.role === "provider") {
      const provider = await Provider.findOne({
        user: user._id,
      });

      if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider profile not found.",
        });
      }

      if (provider.verificationStatus === "pending") {
        return res.status(403).json({
          success: false,
          message: "Your account is waiting for admin approval.",
        });
      }

      if (provider.verificationStatus === "rejected") {
        return res.status(403).json({
          success: false,
          message:
            "Your provider application has been rejected by the administrator.",
        });
      }

      if (!user.isApproved) {
        return res.status(403).json({
          success: false,
          message: "Your account has not been approved yet.",
        });
      }
    }

    // Generate Token
    const token = generateToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Logout
// =============================
const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// =============================
// Current User
// =============================
const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// =============================
// Update Profile
// =============================
const updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name.trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login, logout, getCurrentUser, updateUserProfile };
