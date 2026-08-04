import { useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "@/components/common/Loading";
import ProviderBookingTable from "@/components/provider/booking/ProviderBookingTable";

import { getProviderBookings } from "@/services/bookingService";

const Bookings = () => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Booking Management</h1>

        <p className="text-muted-foreground">Manage all booking requests.</p>
      </div>

      <ProviderBookingTable
        bookings={bookings}
        refreshBookings={fetchBookings}
      />
    </div>
  );
};

export default Bookings;
