import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Search } from "lucide-react";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import BookingTable from "../../components/admin/bookings/BookingTable";
import BookingDetailsDialog from "../../components/admin/bookings/BookingDetailsDialog";

import { getAllBookings } from "../../services/adminService";

import { Input } from "@/components/ui/input";

import { useTheme } from "../../context/ThemeContext";

const Bookings = () => {
  const { colors } = useTheme();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await getAllBookings();

      const bookingData = response.bookings || [];

      setBookings(bookingData);
      setFilteredBookings(bookingData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredBookings(bookings);
      return;
    }

    const result = bookings.filter((booking) => {
      const parentName = booking.parent?.name?.toLowerCase() || "";

      const parentEmail = booking.parent?.email?.toLowerCase() || "";

      const centerName = booking.center?.centerName?.toLowerCase() || "";

      const childName = booking.childName?.toLowerCase() || "";

      return (
        parentName.includes(query) ||
        parentEmail.includes(query) ||
        centerName.includes(query) ||
        childName.includes(query)
      );
    });

    setFilteredBookings(result);
  }, [search, bookings]);

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #FF9500, #FFC300)",
                color: "#241C0F",
              }}
            >
              <CalendarCheck className="h-5 w-5" />
            </div>

            <div>
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{
                  color: colors.text,
                  fontFamily: "Fraunces, serif",
                }}
              >
                Bookings
              </h1>

              <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
                Manage and review all platform bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div
          className="rounded-xl border px-4 py-3"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <p
            className="text-xs font-medium"
            style={{ color: colors.textMuted }}
          >
            Total Bookings
          </p>

          <p
            className="mt-0.5 text-xl font-bold"
            style={{ color: colors.text }}
          >
            {bookings.length}
          </p>
        </div>
      </div>

      {/* Search / Toolbar */}
      <div
        className="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="relative w-full sm:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: colors.textMuted }}
          />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by parent, child or center..."
            className="h-11 rounded-xl pl-10 shadow-none"
            style={{
              backgroundColor: colors.bg,
              borderColor: colors.border,
              color: colors.text,
            }}
          />
        </div>

        <p className="text-sm" style={{ color: colors.textMuted }}>
          Showing{" "}
          <span className="font-semibold" style={{ color: colors.text }}>
            {filteredBookings.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold" style={{ color: colors.text }}>
            {bookings.length}
          </span>{" "}
          bookings
        </p>
      </div>

      {/* Table */}
      <BookingTable bookings={filteredBookings} onView={handleView} />

      {/* Details Dialog */}
      <BookingDetailsDialog
        open={open}
        onOpenChange={setOpen}
        booking={selectedBooking}
      />
    </motion.section>
  );
};

export default Bookings;
