import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import { getCenterDetails } from "../../services/centerService";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CenterDetails = () => {
  const { id } = useParams();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenter();
  }, [id]);

  const fetchCenter = async () => {
    try {
      setLoading(true);

      const response = await getCenterDetails(id);

      setCenter(response.center);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load center.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!center) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center">
        <h2 className="text-2xl font-bold">Center Not Found</h2>

        <p className="mt-2 text-muted-foreground">
          The childcare center doesn't exist.
        </p>

        <Link to="/provider/center">
          <Button className="mt-6">Back to Centers</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{center.centerName}</h1>

          <p className="mt-2 text-muted-foreground">
            View complete childcare center information.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/provider/center">Back</Link>
          </Button>

          <Button asChild>
            <Link to={`/provider/edit-center/${center._id}`}>Edit Center</Link>
          </Button>
        </div>
      </div>

      {/* Hero */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <img
          src={
            center.centerImages?.[0]?.url ||
            "https://placehold.co/1200x500?text=Childcare+Center"
          }
          alt={center.centerName}
          className="h-80 w-full object-cover"
        />

        <div className="space-y-6 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">{center.centerName}</h2>

              <p className="mt-2 text-muted-foreground">
                {center.city}, {center.state}
              </p>
            </div>

            <Badge
              variant={center.status === "active" ? "default" : "secondary"}
            >
              {center.status}
            </Badge>
          </div>

          <p className="leading-7 text-muted-foreground">
            {center.description}
          </p>
        </div>
      </div>

      {/* Information */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Center Information</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Fee</span>

              <span className="font-semibold">₹{center.monthlyFee}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Capacity</span>

              <span className="font-semibold">{center.capacity} Children</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>

              <span className="font-semibold">{center.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>

              <span className="font-semibold">{center.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">24 Hours</span>

              <span className="font-semibold">
                {center.is24Hours ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Facilities */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Facilities</h2>

          <div className="flex flex-wrap gap-3">
            {center.facilities?.length ? (
              center.facilities.map((facility, index) => (
                <Badge key={index} variant="outline">
                  {facility}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground">No facilities available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}

      {center.centerImages?.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Gallery</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {center.centerImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Center ${index + 1}`}
                className="h-52 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CenterDetails;
