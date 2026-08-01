import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { getBookingDetails } from "@/services/bookingService";

import BookingInfo from "@/components/parent/booking/BookingInfo";
import BookingActions from "@/components/parent/booking/BookingActions";

const BookingDetails = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const data = await getBookingDetails(id);

      setBooking(data.booking);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (!booking) {
    return <div className="py-10 text-center">Booking not found</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <BookingInfo booking={booking} />

      <BookingActions booking={booking} refreshBooking={fetchBooking} />
    </div>
  );
};

export default BookingDetails;
