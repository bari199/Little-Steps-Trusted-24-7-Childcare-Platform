import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getCenters } from "../../services/centerService";

import CenterCard from "../../components/parent/CenterCard";
import Loading from "../../components/common/Loading";

const Centers = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      const data = await getCenters();

      console.log("CENTER API RESPONSE:", data);

      setCenters(data.centers);
    } catch (error) {
      console.log(error.response);

      toast.error(error.response?.data?.message || "Failed to load centers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Childcare Centers</h1>

        <p className="text-muted-foreground">
          Browse trusted childcare centers.
        </p>
      </div>

      {/* Empty State */}
      {centers.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="text-xl font-semibold">No Centers Found</h2>

          <p className="mt-2 text-muted-foreground">
            No childcare centers are available right now.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {centers.map((center) => (
            <CenterCard key={center._id} center={center} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Centers;
