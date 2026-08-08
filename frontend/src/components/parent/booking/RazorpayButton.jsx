import { toast } from "sonner";
import { createOrder, verifyPayment } from "@/services/paymentService";

const RazorpayButton = ({ payload, buttonText = "Pay now", onSuccess }) => {
  const handlePayment = async () => {
    try {
      const data = await createOrder(payload);

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Little Steps",
        description: "Childcare booking",
        order_id: data.order.id,

        handler: async (response) => {
          try {
            const verify = await verifyPayment(response);
            toast.success(verify.message);
            onSuccess?.(verify);
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Payment verification failed",
            );
          }
        },

        prefill: {},

        theme: {
          color: "#FF9500",
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
      className="rounded-full bg-gradient-to-r from-[#FF9500] to-[#FFC300] px-5 py-2.5 text-sm font-semibold text-[#241C0F] transition-transform hover:-translate-y-0.5 active:scale-95"
    >
      {buttonText}
    </button>
  );
};

export default RazorpayButton;
