import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getMyCenters, updateCenter } from "../../services/centerService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditCenter = () => {
  const navigate = useNavigate();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchCenter = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMyCenters();
      const centerData = response.centers[0];

      setCenter(centerData);

      reset({
        centerName: centerData.centerName,
        description: centerData.description,
        address: centerData.address,
        city: centerData.city,
        state: centerData.state,
        pincode: centerData.pincode,
        ageGroup: centerData.ageGroup,
        capacity: centerData.capacity,
        monthlyFee: centerData.monthlyFee,
        openingTime: centerData.openingTime,
        closingTime: centerData.closingTime,
        is24Hours: centerData.is24Hours,
        latitude: centerData.location?.latitude,
        longitude: centerData.location?.longitude,
        facilities: centerData.facilities?.join(", "),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load center.");
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchCenter();
  }, [fetchCenter]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (data.facilities) {
        data.facilities = JSON.stringify(
          data.facilities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        );
      }

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach((img) => {
        formData.append("centerImages", img);
      });

      const response = await updateCenter(center._id, formData);

      toast.success(response.message);

      navigate("/provider/center");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update center.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-8 shadow">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Update Childcare Center</h1>

        <p className="mt-2 text-muted-foreground">
          Edit your childcare center details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:grid-cols-2"
      >
        <div>
          <Label>Center Name</Label>
          <Input
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

        <div>
          <Label>Monthly Fee</Label>
          <Input type="number" {...register("monthlyFee")} />
        </div>

        <div>
          <Label>Capacity</Label>
          <Input type="number" {...register("capacity")} />
        </div>

        <div>
          <Label>Age Group</Label>
          <Input {...register("ageGroup")} />
        </div>

        <div>
          <Label>Opening Time</Label>
          <Input type="time" {...register("openingTime")} />
        </div>

        <div>
          <Label>Closing Time</Label>
          <Input type="time" {...register("closingTime")} />
        </div>

        <div>
          <Label>City</Label>
          <Input {...register("city")} />
        </div>

        <div>
          <Label>State</Label>
          <Input {...register("state")} />
        </div>

        <div className="md:col-span-2">
          <Label>Address</Label>
          <Textarea rows={3} {...register("address")} />
        </div>

        <div className="md:col-span-2">
          <Label>Facilities</Label>

          <Input
            placeholder="CCTV, Playground, Meals"
            {...register("facilities")}
          />
        </div>

        <div className="flex items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            className="h-5 w-5"
            {...register("is24Hours")}
          />

          <Label>24 Hours Available</Label>
        </div>

        {/* Existing Images */}

        <div className="md:col-span-2">
          <Label className="mb-3 block">Current Images</Label>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {center.centerImages?.map((image) => (
              <img
                key={image.public_id}
                src={image.url}
                alt=""
                className="h-36 w-full rounded-xl border object-cover"
              />
            ))}
          </div>
        </div>

        {/* Upload */}

        <div className="md:col-span-2">
          <Label>Upload New Images</Label>

          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          {images.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="h-36 w-full rounded-xl border object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:col-span-2"
        >
          {isSubmitting ? "Updating..." : "Update Center"}
        </Button>
      </form>
    </div>
  );
};

export default EditCenter;
