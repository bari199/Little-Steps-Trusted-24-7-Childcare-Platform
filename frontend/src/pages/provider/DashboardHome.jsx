// import { useCallback, useEffect, useState } from "react";

// import {
//   getProviderBookings,
//   getMyCenter,
// } from "../../services/providerService";

// const DashboardHome = () => {
//   const [bookings, setBookings] = useState([]);
//   const [center, setCenter] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchDashboard = useCallback(async () => {
//     try {
//       setLoading(true);

//       const [bookingRes, centerRes] = await Promise.all([
//         getProviderBookings(),
//         getMyCenter(),
//       ]);

//       setBookings(bookingRes.bookings || []);
//       setCenter(centerRes.center || null);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDashboard();
//   }, [fetchDashboard]);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-10">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   const totalBookings = bookings.length;

//   const pendingBookings = bookings.filter(
//     ({ status }) => status === "Pending",
//   ).length;

//   const approvedBookings = bookings.filter(
//     ({ status }) => status === "Approved",
//   ).length;

//   const rejectedBookings = bookings.filter(
//     ({ status }) => status === "Rejected",
//   ).length;

//   const recentBookings = bookings.slice(0, 5);

//   return (
//     <div className="space-y-8">
//       {/* Stats */}
//       <div className="grid gap-5 md:grid-cols-4">
//         <div className="rounded-xl bg-white p-5 shadow">
//           <h3 className="text-sm text-gray-500">Total Bookings</h3>
//           <p className="mt-2 text-3xl font-bold">{totalBookings}</p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow">
//           <h3 className="text-sm text-gray-500">Pending</h3>
//           <p className="mt-2 text-3xl font-bold text-warning">
//             {pendingBookings}
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow">
//           <h3 className="text-sm text-gray-500">Approved</h3>
//           <p className="mt-2 text-3xl font-bold text-success">
//             {approvedBookings}
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow">
//           <h3 className="text-sm text-gray-500">Rejected</h3>
//           <p className="mt-2 text-3xl font-bold text-error">
//             {rejectedBookings}
//           </p>
//         </div>
//       </div>

//       {/* Center Information */}
//       {center && (
//         <div className="rounded-xl bg-white p-6 shadow">
//           <h2 className="mb-4 text-xl font-semibold">Center Information</h2>

//           <div className="grid gap-4 md:grid-cols-2">
//             <div>
//               <span className="font-medium">Center:</span> {center.centerName}
//             </div>

//             <div>
//               <span className="font-medium">City:</span> {center.city}
//             </div>

//             <div>
//               <span className="font-medium">Monthly Fee:</span> ₹
//               {center.monthlyFee}
//             </div>

//             <div>
//               <span className="font-medium">Capacity:</span> {center.capacity}
//             </div>

//             <div>
//               <span className="font-medium">Status:</span> {center.status}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Recent Bookings */}
//       <div className="overflow-x-auto rounded-xl bg-white shadow">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Child</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Plan</th>
//             </tr>
//           </thead>

//           <tbody>
//             {recentBookings.length ? (
//               recentBookings.map((booking) => (
//                 <tr key={booking._id}>
//                   <td>{booking.childName}</td>

//                   <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>

//                   <td>{booking.status}</td>

//                   <td>{booking.planType}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="py-8 text-center">
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  Clock3,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { toast } from "sonner";

import Loading from "@/components/common/Loading";
import { getDashboardStats } from "@/services/providerService";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data.stats);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const cards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings ?? 0,
      icon: CalendarCheck,
    },
    {
      title: "Pending Bookings",
      value: stats?.pendingBookings ?? 0,
      icon: Clock3,
    },
    {
      title: "Completed Bookings",
      value: stats?.completedBookings ?? 0,
      icon: CheckCircle,
    },
    {
      title: "Monthly Revenue",
      value: `₹${stats?.monthlyRevenue ?? 0}`,
      icon: IndianRupee,
    },
    {
      title: "Caregivers",
      value: stats?.totalCaregivers ?? 0,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>

        <p className="text-muted-foreground mt-2">
          Monitor your childcare center activities.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ title, value, icon: Icon }) => (
          <div key={title} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{title}</span>

              <Icon className="h-5 w-5 text-primary" />
            </div>

            <h2 className="mt-4 text-3xl font-bold">{value}</h2>
          </div>
        ))}
      </div>

      {/* Summary */}

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Center Summary</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Approved Bookings</p>

            <h3 className="text-2xl font-bold">{stats?.approvedBookings}</h3>
          </div>

          <div>
            <p className="text-muted-foreground">Rejected Bookings</p>

            <h3 className="text-2xl font-bold">{stats?.rejectedBookings}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
