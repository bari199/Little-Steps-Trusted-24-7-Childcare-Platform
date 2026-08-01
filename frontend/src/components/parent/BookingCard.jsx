import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BookingCard = ({ booking, onCancel }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Cancelled":
        return "bg-gray-200 text-gray-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{booking.center.centerName}</h2>

          <span
            className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
              booking.status,
            )}`}
          >
            {booking.status}
          </span>
        </div>

        <p>
          <strong>City:</strong> {booking.center.city}
        </p>

        <p>
          <strong>Child:</strong> {booking.childName}
        </p>

        <p>
          <strong>Booking Date:</strong>{" "}
          {new Date(booking.bookingDate).toLocaleDateString()}
        </p>

        <p>
          <strong>Plan:</strong> {booking.planType}
        </p>

        <div className="flex gap-3">
          <Button asChild>
            <Link to={`/parent/bookings/${booking._id}`}>View Details</Link>
          </Button>

          {booking.status === "Pending" && (
            <Button variant="destructive" onClick={() => onCancel(booking._id)}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
