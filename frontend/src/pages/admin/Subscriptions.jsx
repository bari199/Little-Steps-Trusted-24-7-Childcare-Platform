import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Search, CreditCard } from "lucide-react";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import SubscriptionTable from "../../components/admin/subscriptions/SubscriptionTable";
import SubscriptionDetailsDialog from "../../components/admin/subscriptions/SubscriptionDetailsDialog";

import { getAllSubscriptions } from "../../services/adminService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchSubscriptions = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await getAllSubscriptions();

      setSubscriptions(response.subscriptions || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load subscriptions",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredSubscriptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return subscriptions;

    return subscriptions.filter((subscription) => {
      const parentName = subscription.parent?.name?.toLowerCase() || "";

      const centerName = subscription.center?.centerName?.toLowerCase() || "";

      const planType = subscription.planType?.toLowerCase() || "";

      const status = subscription.status?.toLowerCase() || "";

      return (
        parentName.includes(query) ||
        centerName.includes(query) ||
        planType.includes(query) ||
        status.includes(query)
      );
    });
  }, [subscriptions, search]);

  const handleView = (subscription) => {
    setSelectedSubscription(subscription);
    setOpen(true);
  };

  const handleRefresh = () => {
    fetchSubscriptions(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-7"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9500]/10">
            <CreditCard className="h-6 w-6 text-[#FF9500]" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage and monitor all active subscriptions.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="
            h-10 gap-2 rounded-xl
            border-[#FF9500]/40
            bg-transparent
            text-[#241C0F]
            hover:bg-[#FF9500]/10
            hover:text-[#241C0F]
            dark:border-[#FF9500]/50
            dark:text-[#FFF6E2]
            dark:hover:bg-[#FF9500]/10
            dark:hover:text-[#FFF6E2]
          "
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Search */}
      <div
        className="
          rounded-2xl
          border border-[#FF9500]/35
          bg-[#FFFDF7]
          p-4
          shadow-sm
          dark:bg-[#211B10]
          dark:border-[#FF9500]/40
        "
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#FF9500]" />

          <Input
            placeholder="Search by parent, center, plan or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-11
              rounded-xl
              border-0
              bg-[#FFF6E2]
              pl-10
              text-[#241C0F]
              placeholder:text-[#6B5D45]
              focus-visible:ring-2
              focus-visible:ring-[#FF9500]
              dark:bg-[#2A2210]
              dark:text-[#FFF6E2]
              dark:placeholder:text-[#C9B896]
            "
          />
        </div>
      </div>

      {/* Table */}
      <SubscriptionTable
        subscriptions={filteredSubscriptions}
        onView={handleView}
      />

      {/* Details */}
      <SubscriptionDetailsDialog
        open={open}
        onOpenChange={setOpen}
        subscription={selectedSubscription}
      />
    </motion.section>
  );
};

export default Subscriptions;
