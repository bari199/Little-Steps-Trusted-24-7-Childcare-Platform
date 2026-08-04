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

export const getProviderBookings = async () => {
  const response = await api.get("/bookings/provider");

  return response.data;
};

// Approve Booking
// Approve Booking
export const approveBooking = async (id) => {
  try {
    console.log("Approving Booking ID:", id);

    const response = await api.patch(`/bookings/approve/${id}`);

    console.log("Approve Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("========== APPROVE BOOKING ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);
    console.error("Full Error:", error);
    console.error("===========================================");

    throw error;
  }
};
// Reject Booking
export const rejectBooking = async (id) => {
  try {
    console.log("Rejecting Booking ID:", id);

    const response = await api.patch(`/bookings/reject/${id}`);

    console.log("Reject Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("========== REJECT BOOKING ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);
    console.error("Full Error:", error);
    console.error("===========================================");

    throw error;
  }
};
