import { toast } from "sonner";

import { approveBooking, rejectBooking } from "@/services/bookingService";

const ProviderBookingActions = ({ booking, refreshBooking }) => {
  const handleApprove = async () => {
    try {
      const data = await approveBooking(booking._id);

      toast.success(data.message);

      refreshBooking();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleReject = async () => {
    try {
      const data = await rejectBooking(booking._id);

      toast.success(data.message);

      refreshBooking();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (booking.status !== "Pending") {
    return null;
  }

  return (
    <div className="flex gap-4">
      <button onClick={handleApprove} className="btn btn-success">
        Approve
      </button>

      <button onClick={handleReject} className="btn btn-error">
        Reject
      </button>
    </div>
  );
};

export default ProviderBookingActions;
