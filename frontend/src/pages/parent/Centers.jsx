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
      setCenters(data.centers);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load centers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold text-[#241C0F] dark:text-[#FFF6E2]"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Childcare centers
        </h1>
        <p className="text-[#6B5D45] dark:text-[#C9B896]">
          Browse trusted childcare centers.
        </p>
      </div>

      {/* Empty state */}
      {centers.length === 0 ? (
        <div className="rounded-2xl border border-[#F0E1BE] p-10 text-center dark:border-[#3A2E17]">
          <h2 className="text-xl font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
            No centers found
          </h2>
          <p className="mt-2 text-[#6B5D45] dark:text-[#C9B896]">
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
