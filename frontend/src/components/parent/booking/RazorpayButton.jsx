import { toast } from "sonner";
import { createOrder, verifyPayment } from "@/services/paymentService";

const RazorpayButton = ({ bookingId }) => {
  const handlePayment = async () => {
    try {
      const data = await createOrder(bookingId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Little Steps",

        description: "Childcare Booking",

        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verify = await verifyPayment(response);

            toast.success(verify.message);
          } catch (error) {
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
      Pay Now
    </button>
  );
};

export default RazorpayButton;
