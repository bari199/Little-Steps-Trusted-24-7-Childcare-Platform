import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import Loading from "../../components/common/Loading";

import { getCenterBySlug } from "../../services/centerService";
import RazorpayButton from "../../components/parent/booking/RazorpayButton";

import { getCaregivers } from "@/services/caregiverService";
import CaregiverCard from "@/components/parent/CaregiverCard";

const getEndDate = (planType, startDate) => {
  const date = new Date(startDate);

  switch (planType) {
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;

    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;

    case "Yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;

    default:
      break;
  }

  return date.toISOString();
};

const CenterDetails = () => {
  const { slug } = useParams();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [caregivers, setCaregivers] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    fetchCenter();
  }, [slug]);

  const fetchCenter = async () => {
    try {
      setLoading(true);

      const data = await getCenterBySlug(slug);

      setCenter(data.center);
      const caregiverData = await getCaregivers({
        center: data.center._id,
      });
      setCaregivers(caregiverData.caregivers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load center");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (!center) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold">Center Not Found</h2>
      </div>
    );
  }

  const startDate = new Date().toISOString();

  const endDate = getEndDate(selectedPlan, startDate);

  return (
    <div className="space-y-8">
      {/* Center Image */}
      <img
        src={
          center.centerImages?.length
            ? center.centerImages[0].url
            : "https://placehold.co/1000x500?text=No+Image"
        }
        alt={center.centerName}
        className="h-80 w-full rounded-lg object-cover"
      />

      {/* Basic Info */}
      <div>
        <h1 className="text-3xl font-bold">{center.centerName}</h1>

        <p className="mt-2 text-muted-foreground">
          {center.city}, {center.state}
        </p>
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Description</h2>

        <p>{center.description}</p>
      </div>

      {/* Information */}
      <div className="grid gap-4 md:grid-cols-2">
        <p>
          <strong>Age Group:</strong> {center.ageGroup}
        </p>

        <p>
          <strong>Capacity:</strong> {center.capacity}
        </p>

        <p>
          <strong>Monthly Fee:</strong> ₹{center.monthlyFee}
        </p>

        <p>
          <strong>Rating:</strong> {center.rating} ⭐
        </p>

        <p>
          <strong>Opening Time:</strong> {center.openingTime}
        </p>

        <p>
          <strong>Closing Time:</strong> {center.closingTime}
        </p>

        <p>
          <strong>24 Hours:</strong> {center.is24Hours ? "Yes" : "No"}
        </p>
      </div>

      {/* Facilities */}
      <div>
        <h2 className="mb-3 text-xl font-semibold">Facilities</h2>

        <div className="flex flex-wrap gap-2">
          {center.facilities?.map((facility, index) => (
            <span key={index} className="rounded-full border px-3 py-1 text-sm">
              {facility}
            </span>
          ))}
        </div>
      </div>

      {/* =========================
        Meet Our Caregivers
        ========================= */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Meet Our Caregivers</h2>

        {caregivers.length === 0 ? (
          <div className="rounded-lg border p-6 text-center">
            No caregivers available for this center.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {caregivers.map((caregiver) => (
              <CaregiverCard key={caregiver._id} caregiver={caregiver} />
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to={`/parent/book/${center.slug}`}>Book Now</Link>
        </Button>

        <Button onClick={handleSubscribe}>Subscribe Now</Button>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold">
              Choose Subscription Plan
            </h2>

            <select
              className="select select-bordered w-full"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSubscriptionModal(false)}
              >
                Cancel
              </Button>

              <RazorpayButton
                buttonText="Continue Payment"
                payload={{
                  center: center._id,
                  planType: selectedPlan,
                  startDate,
                  endDate,
                }}
                onSuccess={() => {
                  setShowSubscriptionModal(false);

                  toast.success("Subscription Activated Successfully");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterDetails;
