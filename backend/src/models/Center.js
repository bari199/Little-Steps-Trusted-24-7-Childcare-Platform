// import mongoose from "mongoose";

// const centerSchema = new mongoose.Schema(
//   {
//     provider: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Provider",
//       required: true,
//       unique: true,
//     },

//     centerName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     address: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     city: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     state: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     pincode: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     ageGroup: {
//       type: String,
//       required: true,
//       enum: ["0-2 Years", "2-5 Years", "5+ Years"],
//     },

//     capacity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     monthlyFee: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     openingTime: {
//       type: String,
//       required: true,
//     },

//     closingTime: {
//       type: String,
//       required: true,
//     },

//     is24Hours: {
//       type: Boolean,
//       default: false,
//     },

//     facilities: {
//       type: [String],
//       default: [],
//     },

//     centerImages: {
//       type: [String],
//       default: [],
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// export default mongoose.model("Center", centerSchema);
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const centerSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    centerName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    ageGroup: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    monthlyFee: {
      type: Number,
      required: true,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    is24Hours: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    facilities: [
      {
        type: String,
      },
    ],

    thumbnail: {
      url: String,
      public_id: String,
    },

    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,

      enum: ["active", "inactive"],

      default: "active",
    },
    location: {
      latitude: Number,

      longitude: Number,
    },

    centerImages: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
      {
        url: "...",
        public_id: "...",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Delete Cloudinary images before deleting the center
centerSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      if (this.centerImages?.length) {
        for (const image of this.centerImages) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  },
);

const Center = mongoose.model("Center", centerSchema);

export default Center;
