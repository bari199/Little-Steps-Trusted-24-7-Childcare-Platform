import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyCenters } from "../../services/centerService";

import Loading from "../../components/common/Loading";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MyCenter = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      const response = await getMyCenters();

      setCenters(response.centers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return <Loading />;
  }

  // Empty State
  if (centers.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center">
        <h2 className="text-2xl font-bold">No Centers Found</h2>

        <p className="mt-3 text-muted-foreground">
          You haven't created any childcare center yet.
        </p>

        <Link to="/provider/create-center">
          <Button className="mt-6">Create Center</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Centers</h1>

          <p className="mt-2 text-muted-foreground">
            Manage all your childcare centers.
          </p>
        </div>

        <Link to="/provider/create-center">
          <Button>Create Center</Button>
        </Link>
      </div>

      {/* Center Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {centers.map((center) => (
          <div
            key={center._id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
          >
            <img
              src={
                center.centerImages?.[0]?.url ||
                "https://placehold.co/600x400?text=Childcare+Center"
              }
              alt={center.centerName}
              className="h-56 w-full object-cover"
            />

            <div className="space-y-5 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{center.centerName}</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {center.city}, {center.state}
                  </p>
                </div>

                <Badge
                  variant={center.status === "active" ? "default" : "secondary"}
                >
                  {center.status}
                </Badge>
              </div>

              <p className="line-clamp-3 text-sm text-muted-foreground">
                {center.description}
              </p>

              <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Fee</p>

                  <p className="font-semibold">₹{center.monthlyFee}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>

                  <p className="font-semibold">{center.capacity}</p>
                </div>
              </div>

              <Link to={`/provider/center/${center._id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyCenter;
