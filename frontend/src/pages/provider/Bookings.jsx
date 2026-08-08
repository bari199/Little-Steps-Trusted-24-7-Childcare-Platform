import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import Loading from "@/components/common/Loading";
import ProviderBookingTable from "@/components/provider/booking/ProviderBookingTable";

import { getProviderBookings } from "@/services/bookingService";
import { useTheme } from "../../context/ThemeContext";

const Bookings = () => {
  const { colors } = useTheme();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getProviderBookings();
      setBookings(data.bookings || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Loading />;

  const pendingCount = bookings.filter(
    (b) => b.status?.toLowerCase() === "pending",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: colors.text, fontFamily: "Fraunces, serif" }}
          >
            Booking management
          </h1>
          <p style={{ color: colors.textMuted }}>
            Manage all booking requests for your centers.
          </p>
        </div>

        {bookings.length > 0 && (
          <p className="text-sm" style={{ color: colors.textMuted }}>
            {bookings.length} total ·{" "}
            <span style={{ color: colors.text, fontWeight: 600 }}>
              {pendingCount} awaiting response
            </span>
          </p>
        )}
      </div>

      {bookings.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed py-16 text-center"
          style={{ borderColor: colors.border }}
        >
          <h2 className="text-xl font-semibold" style={{ color: colors.text }}>
            No bookings yet
          </h2>
          <p className="mt-2 text-sm" style={{ color: colors.textMuted }}>
            New requests from families will show up here as soon as they come
            in.
          </p>
        </div>
      ) : (
        <ProviderBookingTable
          bookings={bookings}
          refreshBookings={fetchBookings}
        />
      )}
    </motion.div>
  );
};

export default Bookings;
