import api from "./api";

// Create Booking
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

// My Bookings
export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");
  return response.data;
};

// Booking Details
export const getBookingDetails = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// Cancel Booking
export const cancelBooking = async (id) => {
  const response = await api.patch(`/bookings/cancel/${id}`);
  return response.data;
};
