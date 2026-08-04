import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";
import ProviderCaregiverTable from "../../components/provider/booking/ProviderCaregiverTable";
import { getProviderCaregivers } from "../../services/caregiverService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      setLoading(true);

      const response = await getProviderCaregivers();

      setCaregivers(response.caregivers || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load caregivers");
    } finally {
      setLoading(false);
    }
  };

  const filteredCaregivers = useMemo(() => {
    return caregivers.filter((caregiver) =>
      caregiver.fullName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [caregivers, search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Caregivers</h1>

          <p className="text-muted-foreground">Manage your caregivers.</p>
        </div>

        <Button asChild>
          <Link to="/provider/caregivers/create">Add Caregiver</Link>
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search caregiver..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Empty State */}
      {filteredCaregivers.length === 0 ? (
        <div className="rounded-lg border py-16 text-center">
          <h2 className="text-2xl font-semibold">No Caregivers Found</h2>

          <p className="text-muted-foreground mt-2">
            {search
              ? "No caregivers match your search."
              : "Create your first caregiver to get started."}
          </p>
        </div>
      ) : (
        <ProviderCaregiverTable
          caregivers={filteredCaregivers}
          onRefresh={fetchCaregivers}
        />
      )}
    </div>
  );
};

export default Caregivers;
