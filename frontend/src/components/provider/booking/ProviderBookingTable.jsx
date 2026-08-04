import { Link } from "react-router-dom";
import { toast } from "sonner";

import { approveBooking, rejectBooking } from "@/services/bookingService";

const ProviderBookingTable = ({ bookings, refreshBookings }) => {
  if (!bookings.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        No bookings found.
      </div>
    );
  }
  const handleApprove = async (id) => {
    try {
      const data = await approveBooking(id);

      toast.success(data.message);

      refreshBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve booking");
    }
  };

  const handleReject = async (id) => {
    try {
      const data = await rejectBooking(id);

      toast.success(data.message);

      refreshBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject booking");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="table">
        <thead>
          <tr>
            <th>Child</th>
            <th>Parent</th>
            <th>Date</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.childName}</td>

              <td>{booking.parent?.name}</td>

              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>

              <td>{booking.planType}</td>

              <td>₹{booking.amount}</td>

              <td>
                <span className="badge badge-info">{booking.status}</span>
              </td>

              <td>
                <span
                  className={`badge ${
                    booking.paymentStatus === "Paid"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </td>

              <td>
                <div className="flex gap-2">
                  <Link
                    to={`/provider/bookings/${booking._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    View
                  </Link>

                  {booking.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(booking._id)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(booking._id)}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderBookingTable;
