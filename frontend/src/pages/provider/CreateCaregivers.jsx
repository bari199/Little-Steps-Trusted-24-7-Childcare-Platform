import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCaregiver } from "../../services/caregiverService";
import { getMyCenters } from "@/services/centerService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateCaregiver = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [centers, setCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      isAvailable: true,
      availability: "Available",
    },
  });

  // Fetch Provider Centers
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setLoadingCenters(true);

        const response = await getMyCenters();

        setCenters(response.centers || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load centers");
      } finally {
        setLoadingCenters(false);
      }
    };

    fetchCenters();
  }, []);

  // Image Handler
  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("qualification", data.qualification);
      formData.append("experience", Number(data.experience));
      formData.append("specialization", data.specialization || "");

      formData.append("isAvailable", String(data.isAvailable));

      formData.append("availability", data.availability);

      formData.append("center", data.center);

      if (image) {
        formData.append("profileImage", image);
      }

      const response = await createCaregiver(formData);

      toast.success(response.message || "Caregiver created successfully");

      navigate("/provider/caregivers");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create caregiver",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>

        <Input
          id="fullName"
          placeholder="Enter caregiver name"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />

        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Qualification */}
      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification</Label>

        <Input
          id="qualification"
          placeholder="Example: Nursing, Child Care Diploma"
          {...register("qualification", {
            required: "Qualification is required",
          })}
        />

        {errors.qualification && (
          <p className="text-sm text-red-500">{errors.qualification.message}</p>
        )}
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <Label htmlFor="experience">Experience (Years)</Label>

        <Input
          id="experience"
          type="number"
          min="0"
          placeholder="Years of experience"
          {...register("experience", {
            required: "Experience is required",
            min: {
              value: 0,
              message: "Experience cannot be negative",
            },
          })}
        />

        {errors.experience && (
          <p className="text-sm text-red-500">{errors.experience.message}</p>
        )}
      </div>

      {/* Specialization */}
      <div className="space-y-2">
        <Label htmlFor="specialization">Specialization</Label>

        <Input
          id="specialization"
          placeholder="Example: Infant Care"
          {...register("specialization")}
        />
      </div>

      {/* Availability Status */}
      <div className="space-y-2">
        <Label htmlFor="availability">Availability Status</Label>

        <select
          id="availability"
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
          {...register("availability")}
        >
          <option value="Available">Available</option>

          <option value="Busy">Busy</option>

          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Active Availability */}
      <div className="flex items-center gap-3">
        <input
          id="isAvailable"
          type="checkbox"
          className="h-4 w-4"
          {...register("isAvailable")}
        />

        <Label htmlFor="isAvailable">Available for duty</Label>
      </div>

      {/* Select Center */}
      <div className="space-y-2">
        <Label htmlFor="center">Select Center</Label>

        <select
          id="center"
          className="border-input bg-background w-full rounded-md border px-3 py-2"
          disabled={loadingCenters}
          {...register("center", {
            required: "Please select a center",
          })}
        >
          <option value="">
            {loadingCenters ? "Loading centers..." : "Select Center"}
          </option>

          {centers.map((center) => (
            <option key={center._id} value={center._id}>
              {center.centerName}
            </option>
          ))}
        </select>

        {errors.center && (
          <p className="text-sm text-red-500">{errors.center.message}</p>
        )}
      </div>

      {/* Profile Image */}
      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Image</Label>

        <Input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create Caregiver"}
      </Button>
    </form>
  );
};

export default CreateCaregiver;
