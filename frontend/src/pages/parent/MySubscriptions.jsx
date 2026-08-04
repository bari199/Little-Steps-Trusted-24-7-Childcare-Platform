import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { getMySubscriptions } from "../../services/subscriptionService";

const [subscriptions, setSubscriptions] = useState([]);
const [loading, setLoading] = useState(true);

const fetchSubscriptions = async () => {
  try {
    setLoading(true);

    const response = await getMySubscriptions();

    if (response.success) {
      setSubscriptions(response.subscriptions);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to load subscriptions",
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchSubscriptions();
}, []);

if (!subscriptions.length) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold">No Subscription Found</h2>

      <p className="text-gray-500 mt-2">
        You haven't subscribed to any childcare plan yet.
      </p>
    </div>
  );
}

const MySubscriptions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Subscriptions</h1>

      {subscriptions.map((subscription) => (
        <div key={subscription._id} className="border rounded-lg p-5">
          <h2 className="text-xl font-semibold">
            {subscription.center.centerName}
          </h2>

          <p>Plan : {subscription.planType}</p>

          <p>Amount : ₹{subscription.amount}</p>

          <p>Status :{subscription.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MySubscriptions;
