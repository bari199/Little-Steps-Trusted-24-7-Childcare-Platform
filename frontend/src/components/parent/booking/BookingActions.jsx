import RazorpayButton from "./RazorpayButton";

const BookingActions = ({ booking }) => {
  const canPay =
    booking.status === "Approved" && booking.paymentStatus === "Pending";

  return (
    <div className="flex gap-3">
      {canPay && (
        <RazorpayButton
          payload={{
            bookingId: booking._id,
          }}
        />
      )}
    </div>
  );
};

export default BookingActions;
