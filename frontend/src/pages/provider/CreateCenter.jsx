import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCenter } from "../../services/centerService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateCenter = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    setImages(files);
  };

  const onSubmit = async (data) => {
    try {
      if (images.length === 0) {
        return toast.error("Please upload at least one image.");
      }

      const formData = new FormData();

      const facilities = data.facilities
        ? data.facilities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const payload = {
        ...data,
        capacity: Number(data.capacity),
        monthlyFee: Number(data.monthlyFee),
        pricePerDay: Number(data.pricePerDay),
        is24Hours: Boolean(data.is24Hours),
        facilities: JSON.stringify(facilities),
      };

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      images.forEach((image) => {
        formData.append("centerImages", image);
      });

      const response = await createCenter(formData);

      toast.success(response.message || "Center created successfully.");

      navigate("/provider/center");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create center.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">Create Childcare Center</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Center Name */}
        <div>
          <Label>Center Name</Label>

          <Input
            placeholder="Little Steps Childcare"
            {...register("centerName", {
              required: "Center name is required",
            })}
          />

          {errors.centerName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.centerName.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <Label>Address</Label>

          <Input
            placeholder="Street, City"
            {...register("address", {
              required: "Address is required",
            })}
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>
        {/* City */}
        <div>
          <Label>City</Label>

          <Input
            placeholder="Kolkata"
            {...register("city", {
              required: "City is required",
            })}
          />

          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <Label>State</Label>

          <Input
            placeholder="West Bengal"
            {...register("state", {
              required: "State is required",
            })}
          />

          {errors.state && (
            <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <Label>Pincode</Label>

          <Input
            placeholder="700001"
            {...register("pincode", {
              required: "Pincode is required",
            })}
          />

          {errors.pincode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.pincode.message}
            </p>
          )}
        </div>

        {/* Age Group */}
        <div>
          <Label>Age Group</Label>

          <Input
            placeholder="2-5 Years"
            {...register("ageGroup", {
              required: "Age group is required",
            })}
          />

          {errors.ageGroup && (
            <p className="mt-1 text-sm text-red-500">
              {errors.ageGroup.message}
            </p>
          )}
        </div>

        {/* Opening Time */}
        <div>
          <Label>Opening Time</Label>

          <Input
            type="time"
            {...register("openingTime", {
              required: "Opening time is required",
            })}
          />

          {errors.openingTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.openingTime.message}
            </p>
          )}
        </div>

        {/* Closing Time */}
        <div>
          <Label>Closing Time</Label>

          <Input
            type="time"
            {...register("closingTime", {
              required: "Closing time is required",
            })}
          />

          {errors.closingTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.closingTime.message}
            </p>
          )}
        </div>

        {/* Capacity */}
        <div>
          <Label>Capacity</Label>

          <Input
            type="number"
            placeholder="50"
            {...register("capacity", {
              required: "Capacity is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Capacity must be greater than 0",
              },
            })}
          />

          {errors.capacity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.capacity.message}
            </p>
          )}
        </div>

        {/* Price Per Day */}
        <div>
          <Label>Price Per Day (₹)</Label>

          <Input
            type="number"
            placeholder="500"
            {...register("pricePerDay", {
              required: "Price per day is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
          />

          {errors.pricePerDay && (
            <p className="mt-1 text-sm text-red-500">
              {errors.pricePerDay.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <Label>Monthly Fee (₹)</Label>

          <Input
            type="number"
            placeholder="5000"
            {...register("monthlyFee", {
              required: "Monthly fee is required",
              valueAsNumber: true,
            })}
          />

          {errors.monthlyFee && (
            <p className="mt-1 text-sm text-red-500">
              {errors.monthlyFee.message}
            </p>
          )}
        </div>
        {/* Facilities */}
        <div className="md:col-span-2">
          <Label>Facilities</Label>

          <Input
            placeholder="CCTV, AC, Playground, Meals, Transport"
            {...register("facilities")}
          />

          <p className="mt-2 text-xs text-gray-500">
            Separate multiple facilities with commas.
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Label>Description</Label>

          <Textarea
            rows={5}
            placeholder="Describe your childcare center..."
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* 24 Hours */}
        <div className="flex items-center gap-3 md:col-span-2">
          <Input
            id="is24Hours"
            type="checkbox"
            className="h-5 w-5"
            {...register("is24Hours")}
          />

          <Label htmlFor="is24Hours">Open 24 Hours</Label>
        </div>

        {/* Images */}
        <div className="md:col-span-2">
          <Label>Center Images</Label>

          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          <p className="mt-2 text-xs text-gray-500">
            You can upload multiple images.
          </p>

          {previews.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {previews.map((preview, index) => (
                <div key={index} className="overflow-hidden rounded-lg border">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-36 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating Center..." : "Create Center"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCenter;
