import { Routes, Route } from "react-router-dom";
import Centers from "./pages/parent/Centers";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentProfile from "./pages/parent/ParentProfile";
import EditProfile from "./pages/parent/EditProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import CenterDetails from "./pages/parent/CenterDetails";
import BookingForm from "./pages/parent/BookingForm";
import MyBookings from "./pages/parent/MyBookings";
import Payments from "./pages/parent/Payments";
import BookingDetails from "./pages/parent/BookingDetails";
import CaregiverDetails from "./pages/parent/CaregiverDetails";
import ParentCaregivers from "./pages/parent/Caregivers";
import ParentLayout from "./components/parent/ParentLayout";

import Dashboard from "./pages/provider/Dashboard";
import DashboardHome from "./pages/provider/DashboardHome";
import MyCenter from "./pages/provider/MyCenter";
import Caregivers from "./pages/provider/Caregivers";
import CreateCaregiver from "./pages/provider/CreateCaregivers";
import EditCaregiver from "./pages/provider/EditCaregiver";
import Bookings from "./pages/provider/Bookings";
import Profile from "./pages/provider/Profile";

import EditProviderProfile from "../pages/provider/EditProviderProfile";
import ProviderBookingDetails from "./pages/provider/BookingDetails";
import ProviderCaregiverDetails from "./pages/provider/CaregiverDetails";
import CreateCenter from "./pages/provider/CreateCenter";
import ProviderCenterDetails from "./pages/provider/CenterDetails";
import EditCenter from "./pages/provider/EditCenter";

// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdmnDashboardHome from "./pages/admin/DashboardHome";
import AdminProviders from "./pages/admin/Providers";
import AdminCenters from "./pages/admin/Centers";
import AdminBookings from "./pages/admin/Bookings";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminPayments from "./pages/admin/Payments";
import AdminReports from "./pages/admin/Reports";

function App() {
  return (
    <Routes>
      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="/parent"
        element={
          <ProtectedRoute roles={["parent"]}>
            <ParentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ParentDashboard />} />

        <Route path="profile" element={<ParentProfile />} />

        <Route path="profile/edit" element={<EditProfile />} />

        <Route path="centers" element={<Centers />} />

        <Route path="centers/:slug" element={<CenterDetails />} />

        <Route path="book/:slug" element={<BookingForm />} />

        <Route path="my-bookings" element={<MyBookings />} />

        <Route path="bookings/:id" element={<BookingDetails />} />

        <Route path="caregivers" element={<ParentCaregivers />} />

        <Route path="caregivers/:id" element={<CaregiverDetails />} />

        <Route path="payments" element={<Payments />} />
      </Route>

      {/* <Route
        path="/parent/centers"
        element={
          <ProtectedRoute roles={["parent"]}>
            <Centers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/centers/:slug"
        element={
          <ProtectedRoute roles={["parent"]}>
            <CenterDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/book/:slug"
        element={
          <ProtectedRoute roles={["parent"]}>
            <BookingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/my-bookings"
        element={
          <ProtectedRoute roles={["parent"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/bookings/:id"
        element={
          <ProtectedRoute roles={["parent"]}>
            <BookingDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/caregivers"
        element={
          <ProtectedRoute roles={["parent"]}>
            <ParentCaregivers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/caregivers/:id"
        element={
          <ProtectedRoute roles={["parent"]}>
            <CaregiverDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/payments"
        element={
          <ProtectedRoute roles={["parent"]}>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/profile/edit"
        element={
          <ProtectedRoute roles={["parent"]}>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/dashboard"
        element={
          <ProtectedRoute roles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/profile"
        element={
          <ProtectedRoute roles={["parent"]}>
            <ParentProfile />
          </ProtectedRoute>
        }
      />
       */}

      {/* ================= Provider ================= */}

      <Route
        path="/provider"
        element={
          <ProtectedRoute roles={["provider"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="bookings/:id" element={<ProviderBookingDetails />} />

        <Route path="dashboard" element={<DashboardHome />} />

        <Route path="center" element={<MyCenter />} />

        <Route path="create-center" element={<CreateCenter />} />

        <Route path="center/:id" element={<ProviderCenterDetails />} />

        <Route path="edit-center/:id" element={<EditCenter />} />

        <Route path="edit-profile" element={<EditProviderProfile />} />

        <Route path="caregivers" element={<Caregivers />} />

        <Route path="caregivers/create" element={<CreateCaregiver />} />

        <Route path="caregivers/:id" element={<ProviderCaregiverDetails />} />

        <Route path="caregivers/edit/:id" element={<EditCaregiver />} />

        <Route path="bookings" element={<Bookings />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ================= Admin ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdmnDashboardHome />} />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/providers"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminProviders />
            </ProtectedRoute>
          }
        />
        <Route path="providers" element={<AdminProviders />} />

        <Route path="centers" element={<AdminCenters />} />

        <Route path="bookings" element={<AdminBookings />} />

        <Route path="subscriptions" element={<AdminSubscriptions />} />

        <Route path="payments" element={<AdminPayments />} />

        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
