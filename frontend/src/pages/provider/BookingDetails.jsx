import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import Loading from "@/components/common/Loading";

import { getBookingDetails } from "@/services/bookingService";

import ProviderBookingInfo from "@/components/provider/booking/ProviderBookingInfo";
import ProviderBookingActions from "@/components/provider/booking/ProviderBookingActions";

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
    return <Loading />;
  }

  if (!booking) {
    return <div className="py-10 text-center">Booking not found</div>;
  }

  return (
    <div className="space-y-6">
      <ProviderBookingInfo booking={booking} />

      <ProviderBookingActions booking={booking} refreshBooking={fetchBooking} />
    </div>
  );
};

export default BookingDetails;
