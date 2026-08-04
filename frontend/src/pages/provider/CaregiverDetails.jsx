import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";
import { getCaregiverDetails } from "../../services/caregiverService";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CaregiverDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [caregiver, setCaregiver] = useState(null);

  useEffect(() => {
    fetchCaregiver();
  }, []);

  const fetchCaregiver = async () => {
    try {
      setLoading(true);

      const response = await getCaregiverDetails(id);
      setCaregiver(response.caregiver);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load caregiver.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!caregiver) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center">
        <h2 className="text-2xl font-bold">Caregiver Not Found</h2>

        <p className="mt-2 text-muted-foreground">
          The caregiver you're looking for doesn't exist.
        </p>

        <Link to="/provider/caregivers">
          <Button className="mt-6">Back to Caregivers</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Caregiver Details</h1>

          <p className="mt-2 text-muted-foreground">
            View caregiver profile and employment information.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/provider/caregivers">Back</Link>
          </Button>

          <Button asChild>
            <Link to={`/provider/caregivers/edit/${caregiver._id}`}>
              Edit Caregiver
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Card */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row">
          <img
            src={caregiver.profileImage?.url || "/default-avatar.png"}
            alt={caregiver.fullName}
            className="h-44 w-44 rounded-2xl border object-cover"
          />

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold">{caregiver.fullName}</h2>

                <p className="mt-2 text-muted-foreground">
                  {caregiver.qualification}
                </p>
              </div>

              <Badge variant={caregiver.isAvailable ? "default" : "secondary"}>
                {caregiver.isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Experience</p>

                <p className="mt-1 text-lg font-semibold">
                  {caregiver.experience} Years
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Specialization</p>

                <p className="mt-1 text-lg font-semibold">
                  {caregiver.specialization || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">
                  Childcare Center
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {caregiver.center?.centerName || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">City</p>

                <p className="mt-1 text-lg font-semibold">
                  {caregiver.center?.city || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaregiverDetails;
