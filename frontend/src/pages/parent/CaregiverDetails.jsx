import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import Loading from "@/components/common/Loading";
import { getCaregiverDetails } from "@/services/caregiverService";

const CaregiverDetails = () => {
  console.log("✅ CaregiverDetails Rendered");
  const { id } = useParams();
  console.log("Caregiver ID:", id);

  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaregiver();
  }, [id]);

  const fetchCaregiver = async () => {
    try {
      const data = await getCaregiverDetails(id);

      console.log("Route ID:", id);
      console.log("API Response:", data);
      console.log("Caregiver:", data.caregiver);

      setCaregiver(data.caregiver);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load caregiver");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (!caregiver) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold">Caregiver Not Found</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <img
        src={
          caregiver.profileImage?.url ||
          "https://placehold.co/1000x500?text=Caregiver"
        }
        alt={caregiver.fullName}
        className="h-96 w-full rounded-xl object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold">{caregiver.fullName}</h1>

        <p className="text-muted-foreground">{caregiver.center?.centerName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-5">
          <h2 className="mb-4 text-xl font-semibold">Professional Details</h2>

          <div className="space-y-3">
            <p>
              <strong>Qualification:</strong> {caregiver.qualification}
            </p>

            <p>
              <strong>Experience:</strong> {caregiver.experience} Years
            </p>

            <p>
              <strong>Specialization:</strong>{" "}
              {caregiver.specialization || "General Child Care"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {caregiver.isAvailable ? (
                <span className="text-green-600">Available</span>
              ) : (
                <span className="text-red-600">Not Available</span>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="mb-4 text-xl font-semibold">Center Information</h2>

          <div className="space-y-3">
            <p>
              <strong>Center:</strong> {caregiver.center?.centerName}
            </p>

            <p>
              <strong>City:</strong> {caregiver.center?.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDetails;
