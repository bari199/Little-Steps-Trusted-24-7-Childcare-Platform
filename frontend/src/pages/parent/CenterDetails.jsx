import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";
import { getCenterBySlug } from "../../services/centerService";

const CenterDetails = () => {
  const { slug } = useParams();

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenter();
  }, [slug]);

  const fetchCenter = async () => {
    try {
      const data = await getCenterBySlug(slug);

      setCenter(data.center);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load center");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!center) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Center Not Found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Image */}
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
      <Button asChild>
        <Link to={`/parent/book/${center.slug}`}>Book Now</Link>
      </Button>
    </div>
  );
};

export default CenterDetails;
