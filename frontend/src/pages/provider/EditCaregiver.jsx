import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import {
  getCaregiverDetails,
  updateCaregiver,
} from "../../services/caregiverService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditCaregiver = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchCaregiver();
  }, []);

  const fetchCaregiver = async () => {
    try {
      setLoading(true);

      const response = await getCaregiverDetails(id);

      reset({
        fullName: response.caregiver.fullName,
        qualification: response.caregiver.qualification,
        experience: response.caregiver.experience,
        specialization: response.caregiver.specialization,
        isAvailable: response.caregiver.isAvailable,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load caregiver");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("qualification", data.qualification);
      formData.append("experience", Number(data.experience));
      formData.append("specialization", data.specialization || "");
      formData.append("isAvailable", data.isAvailable);

      if (image) {
        formData.append("profileImage", image);
      }

      const response = await updateCaregiver(id, formData);

      toast.success(response.message);

      navigate("/provider/caregivers");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update caregiver",
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <h1 className="mb-8 text-3xl font-bold">Edit Caregiver</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>

          <Input
            id="fullName"
            {...register("fullName", {
              required: "Full name is required",
            })}
          />

          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="qualification">Qualification</Label>

          <Input
            id="qualification"
            {...register("qualification", {
              required: "Qualification is required",
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience (Years)</Label>

          <Input
            id="experience"
            type="number"
            min="0"
            {...register("experience", {
              required: "Experience is required",
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>

          <Input id="specialization" {...register("specialization")} />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="isAvailable"
            type="checkbox"
            {...register("isAvailable")}
          />

          <Label htmlFor="isAvailable">Available for duty</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileImage">Profile Image</Label>

          <Input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Caregiver"}
        </Button>
      </form>
    </div>
  );
};

export default EditCaregiver;
