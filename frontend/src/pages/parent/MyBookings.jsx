import { useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import BookingCard from "../../components/parent/BookingCard";

import { getMyBookings, cancelBooking } from "../../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();

      setBookings(data.bookings);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await cancelBooking(id);

      toast.success(response.message);

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>

        <p className="text-muted-foreground">View and manage your bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="text-xl font-semibold">No Bookings Found</h2>

          <p className="mt-2 text-muted-foreground">
            You haven't booked any childcare center yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
