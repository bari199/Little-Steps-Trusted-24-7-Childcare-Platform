import { toast } from "sonner";
import { createOrder, verifyPayment } from "@/services/paymentService";

const RazorpayButton = ({ payload, buttonText = "Pay Now", onSuccess }) => {
  const handlePayment = async () => {
    try {
      console.log("Payment Payload:", payload);

      const data = await createOrder(payload);

      console.log("Create Order Response:", data);

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Little Steps",
        description: "Childcare Booking",
        order_id: data.order.id,

        handler: async (response) => {
          try {
            console.log("Razorpay Response:", response);

            const verify = await verifyPayment(response);

            toast.success(verify.message);

            onSuccess?.(verify);
          } catch (error) {
            console.error("VERIFY ERROR:", error.response?.data || error);

            toast.error(
              error.response?.data?.message || "Payment verification failed",
            );
          }
        },

        prefill: {},

        theme: {
          color: "#16a34a",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("CREATE ORDER ERROR:", error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Unable to create payment order",
      );
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="rounded-lg bg-green-600 px-5 py-2 text-white"
    >
      {buttonText}
    </button>
  );
};

export default RazorpayButton;
