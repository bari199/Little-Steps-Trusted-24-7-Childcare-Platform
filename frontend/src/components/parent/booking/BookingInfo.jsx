const BookingInfo = ({ booking }) => {
  return (
    <div className="rounded-xl border p-6 shadow-sm space-y-3">
      <h2 className="text-2xl font-bold">{booking.center.centerName}</h2>

      <p>Child :{booking.childName}</p>

      <p>Age :{booking.childAge}</p>

      <p>Booking Date :{new Date(booking.bookingDate).toLocaleDateString()}</p>

      <p>Plan :{booking.planType}</p>

      <p>Booking Status :{booking.status}</p>

      <p>Payment Status :{booking.paymentStatus}</p>
    </div>
  );
};

export default BookingInfo;
