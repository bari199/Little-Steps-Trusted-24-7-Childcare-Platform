import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { Button } from "../../components/ui/button";
import Loading from "../../components/common/Loading";

import { getCenterBySlug } from "../../services/centerService";
import RazorpayButton from "../../components/parent/booking/RazorpayButton";

import { getCaregivers } from "@/services/caregiverService";
import CaregiverCard from "@/components/parent/CaregiverCard";

const selectClass =
  "w-full rounded-md border border-[#F0E1BE] bg-white px-3 py-2 text-sm text-[#241C0F] focus:outline-none focus:ring-2 focus:ring-[#FF9500] dark:border-[#3A2E17] dark:bg-[#2A2210] dark:text-[#FFF6E2]";

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

      const caregiverData = await getCaregivers({ center: data.center._id });
      setCaregivers(caregiverData.caregivers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load center");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => setShowSubscriptionModal(true);

  if (loading) return <Loading />;

  if (!center) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold text-[#241C0F] dark:text-[#FFF6E2]">
          Center not found
        </h2>
      </div>
    );
  }

  const startDate = new Date().toISOString();
  const endDate = getEndDate(selectedPlan, startDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Center image */}
      <img
        src={
          center.centerImages?.length
            ? center.centerImages[0].url
            : "https://placehold.co/1000x500?text=No+Image"
        }
        alt={center.centerName}
        className="h-80 w-full rounded-2xl object-cover"
      />

      {/* Basic info */}
      <div>
        <h1
          className="text-3xl font-bold text-[#241C0F] dark:text-[#FFF6E2]"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {center.centerName}
        </h1>
        <p className="mt-2 text-[#6B5D45] dark:text-[#C9B896]">
          {center.city}, {center.state}
        </p>
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-2 text-xl font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
          Description
        </h2>
        <p className="text-[#6B5D45] dark:text-[#C9B896]">
          {center.description}
        </p>
      </div>

      {/* Information */}
      <div className="grid gap-3 text-sm text-[#6B5D45] dark:text-[#C9B896] md:grid-cols-2">
        <p>
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            Age group:
          </span>{" "}
          {center.ageGroup}
        </p>
        <p>
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            Capacity:
          </span>{" "}
          {center.capacity}
        </p>
        <p>
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            Monthly fee:
          </span>{" "}
          ₹{center.monthlyFee}
        </p>
        <p className="flex items-center gap-1">
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            Rating:
          </span>{" "}
          {center.rating}
          <Star className="h-3.5 w-3.5 fill-[#FF9500] text-[#FF9500]" />
        </p>
        <p>
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            Opening time:
          </span>{" "}
          {center.openingTime}
        </p>
        <p>
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            Closing time:
          </span>{" "}
          {center.closingTime}
        </p>
        <p>
          <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            24 hours:
          </span>{" "}
          {center.is24Hours ? "Yes" : "No"}
        </p>
      </div>

      {/* Facilities */}
      <div>
        <h2 className="mb-3 text-xl font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
          Facilities
        </h2>
        <div className="flex flex-wrap gap-2">
          {center.facilities?.map((facility, index) => (
            <span
              key={index}
              className="rounded-full border border-[#F0E1BE] px-3 py-1 text-sm text-[#6B5D45] dark:border-[#3A2E17] dark:text-[#C9B896]"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>

      {/* Meet our caregivers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#241C0F] dark:text-[#FFF6E2]">
          Meet our caregivers
        </h2>

        {caregivers.length === 0 ? (
          <div className="rounded-2xl border border-[#F0E1BE] p-6 text-center text-[#6B5D45] dark:border-[#3A2E17] dark:text-[#C9B896]">
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

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          asChild
          className="bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F] hover:opacity-90"
        >
          <Link to={`/parent/book/${center.slug}`}>Book now</Link>
        </Button>

        <Button
          variant="outline"
          onClick={handleSubscribe}
          className="border-[#F0E1BE] dark:border-[#3A2E17] dark:text-[#FFF6E2]"
        >
          Subscribe now
        </Button>
      </div>

      {/* Subscription modal */}
      <AnimatePresence>
        {showSubscriptionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-[#F0E1BE] bg-white p-6 shadow-xl dark:border-[#3A2E17] dark:bg-[#211B10]"
            >
              <h2
                className="mb-5 text-2xl font-bold text-[#241C0F] dark:text-[#FFF6E2]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                Choose subscription plan
              </h2>

              <select
                className={selectClass}
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
                  className="border-[#F0E1BE] dark:border-[#3A2E17] dark:text-[#FFF6E2]"
                >
                  Cancel
                </Button>

                <RazorpayButton
                  buttonText="Continue payment"
                  payload={{
                    center: center._id,
                    planType: selectedPlan,
                    startDate,
                    endDate,
                  }}
                  onSuccess={() => {
                    setShowSubscriptionModal(false);
                    toast.success("Subscription activated successfully");
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CenterDetails;
