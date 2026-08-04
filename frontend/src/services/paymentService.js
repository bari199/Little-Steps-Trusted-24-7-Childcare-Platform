import api from "./api";

// Create Razorpay Order
export const createOrder = async (payload) => {
  console.log(import.meta.env.VITE_API_URL);
  const response = await api.post("/payments/create-order", payload);

  return response.data;
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentData) => {
  const response = await api.post("/payments/verify", paymentData);

  return response.data;
};

// Get My Payments
export const getMyPayments = async () => {
  const response = await api.get("/payments/my-payments");

  return response.data;
};

// Get Single Payment
export const getPaymentDetails = async (id) => {
  const response = await api.get(`/payments/${id}`);

  return response.data;
};
