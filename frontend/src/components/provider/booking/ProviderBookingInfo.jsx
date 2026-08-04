const ProviderBookingInfo = ({ booking }) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Booking Information</h2>

      <div className="grid gap-5 md:grid-cols-2">
        <p>
          <strong>Child:</strong> {booking.childName}
        </p>

        <p>
          <strong>Age:</strong> {booking.childAge}
        </p>

        <p>
          <strong>Parent:</strong> {booking.parent?.name}
        </p>

        <p>
          <strong>Email:</strong> {booking.parent?.email}
        </p>

        <p>
          <strong>Center:</strong> {booking.center?.centerName}
        </p>

        <p>
          <strong>City:</strong> {booking.center?.city}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(booking.bookingDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Time:</strong> {booking.startTime} - {booking.endTime}
        </p>

        <p>
          <strong>Plan:</strong> {booking.planType}
        </p>

        <p>
          <strong>Amount:</strong> ₹{booking.amount}
        </p>

        <p>
          <strong>Status:</strong> {booking.status}
        </p>

        <p>
          <strong>Payment:</strong> {booking.paymentStatus}
        </p>
      </div>

      <div className="mt-6">
        <strong>Special Instructions</strong>

        <div className="mt-2 rounded-lg border p-4">
          {booking.specialInstructions || "No instructions"}
        </div>
      </div>
    </div>
  );
};

export default ProviderBookingInfo;
