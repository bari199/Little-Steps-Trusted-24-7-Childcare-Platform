import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import { getCenterBySlug } from "../../services/centerService";
import { createBooking } from "../../services/bookingService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BookingForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchCenter();
  }, [slug]);

  const fetchCenter = async () => {
    try {
      setLoading(true);

      const data = await getCenterBySlug(slug);

      setCenter(data.center);
    } catch (error) {
      toast.error(error.response?.data?.message || "Center not found");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      let amount = 0;

      switch (formData.planType) {
        case "Hourly":
          amount = Math.round(center.monthlyFee / 160); // Approx hourly
          break;

        case "Daily":
          amount = Math.round(center.monthlyFee / 22); // Approx daily
          break;

        case "Monthly":
          amount = center.monthlyFee;
          break;

        default:
          amount = center.monthlyFee;
      }

      const bookingData = {
        ...formData,
        center: center._id,
        childAge: Number(formData.childAge),
        amount,
      };

      const response = await createBooking(bookingData);

      toast.success(response.message);

      navigate("/parent/my-bookings");
    } catch (error) {
      console.error(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to create booking");
    }
  };
  if (loading) return <Loading />;

  if (!center) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Center Information */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">{center.centerName}</h2>

        <p className="mt-2 text-gray-500">
          {center.city}, {center.state}
        </p>

        <div className="mt-6 space-y-3">
          <p>
            <strong>Monthly Fee:</strong> ₹{center.monthlyFee}
          </p>

          <p>
            <strong>Age Group:</strong> {center.ageGroup}
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        {/* Child Name */}
        <div className="space-y-2">
          <Label>Child Name</Label>

          <Input
            placeholder="Enter child name"
            {...register("childName", {
              required: "Child name is required",
            })}
          />

          {errors.childName && (
            <p className="text-sm text-red-500">{errors.childName.message}</p>
          )}
        </div>

        {/* Child Age */}
        <div className="space-y-2">
          <Label>Child Age</Label>

          <Input
            type="number"
            min="0"
            placeholder="Enter child age"
            {...register("childAge", {
              required: "Child age is required",
              min: {
                value: 0,
                message: "Age cannot be negative",
              },
            })}
          />

          {errors.childAge && (
            <p className="text-sm text-red-500">{errors.childAge.message}</p>
          )}
        </div>

        {/* Booking Date */}
        <div className="space-y-2">
          <Label>Booking Date</Label>

          <Input
            type="date"
            {...register("bookingDate", {
              required: "Booking date is required",
            })}
          />

          {errors.bookingDate && (
            <p className="text-sm text-red-500">{errors.bookingDate.message}</p>
          )}
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <Label>Start Time</Label>

          <Input
            type="time"
            {...register("startTime", {
              required: "Start time is required",
            })}
          />

          {errors.startTime && (
            <p className="text-sm text-red-500">{errors.startTime.message}</p>
          )}
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <Label>End Time</Label>

          <Input
            type="time"
            {...register("endTime", {
              required: "End time is required",
            })}
          />

          {errors.endTime && (
            <p className="text-sm text-red-500">{errors.endTime.message}</p>
          )}
        </div>

        {/* Plan Type */}
        <div className="space-y-2">
          <Label>Plan Type</Label>

          <select
            className="select select-bordered w-full"
            defaultValue=""
            {...register("planType", {
              required: "Plan type is required",
            })}
          >
            <option value="" disabled>
              Select Plan
            </option>

            <option value="Hourly">Hourly</option>
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
          </select>

          {errors.planType && (
            <p className="text-sm text-red-500">{errors.planType.message}</p>
          )}
        </div>

        {/* Special Instructions */}
        <div className="space-y-2">
          <Label>Special Instructions</Label>

          <Textarea
            rows={4}
            placeholder="Any special requirements..."
            {...register("specialInstructions")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Book Now"}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
