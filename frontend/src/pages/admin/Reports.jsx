import { useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "../../components/common/Loading";

import OverviewCards from "../../components/admin/reports/OverviewCards";
import RevenueChart from "../../components/admin/reports/RevenueChart";
import BookingChart from "../../components/admin/reports/BookingChart";
import SubscriptionChart from "../../components/admin/reports/SubscriptionChart";

import {
  getOverviewReport,
  getRevenueReport,
  getBookingReport,
  getSubscriptionReport,
} from "../../services/adminService";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const [overviewRes, revenueRes, bookingRes, subscriptionRes] =
        await Promise.all([
          getOverviewReport(),
          getRevenueReport(),
          getBookingReport(),
          getSubscriptionReport(),
        ]);

      setOverview(overviewRes.report);

      setRevenue(revenueRes.report);

      setBookings(bookingRes.report);

      setSubscriptions(subscriptionRes.report);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>

        <p className="text-muted-foreground">Platform analytics dashboard</p>
      </div>

      <OverviewCards data={overview} />

      <RevenueChart data={revenue} />

      <BookingChart data={bookings} />

      <SubscriptionChart data={subscriptions} />
    </div>
  );
};

export default Reports;
