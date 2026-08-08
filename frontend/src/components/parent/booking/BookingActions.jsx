import RazorpayButton from "./RazorpayButton";

const BookingActions = ({ booking }) => {
  const canPay =
    booking.status === "Approved" && booking.paymentStatus === "Pending";

  if (!canPay) return null;

  return (
    <div className="flex gap-3">
      <RazorpayButton payload={{ bookingId: booking._id }} />
    </div>
  );
};

export default BookingActions;
