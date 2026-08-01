const PaymentCard = ({ payment }) => {
  return (
    <div className="rounded-xl border p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        {payment.booking?.center?.centerName ||
          payment.subscription?.center?.centerName}
      </h2>

      <p>Amount : ₹{payment.amount}</p>

      <p>Status :{payment.status}</p>

      <p>Payment Method :{payment.paymentMethod}</p>

      <p>Date :{new Date(payment.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default PaymentCard;
