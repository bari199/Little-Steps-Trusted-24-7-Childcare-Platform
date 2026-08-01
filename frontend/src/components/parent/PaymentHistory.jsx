import PaymentCard from "./PaymentCard";

const PaymentHistory = ({ payments, loading }) => {
  if (loading) {
    return <div className="py-10 text-center">Loading Payments...</div>;
  }

  if (payments.length === 0) {
    return <div className="py-10 text-center">No Payment History Found</div>;
  }

  return (
    <div className="grid gap-5">
      {payments.map((payment) => (
        <PaymentCard key={payment._id} payment={payment} />
      ))}
    </div>
  );
};

export default PaymentHistory;
