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

// ================= Provider =================

import Dashboard from "./pages/provider/Dashboard";
import DashboardHome from "./pages/provider/DashboardHome";
import MyCenter from "./pages/provider/MyCenter";
import Caregivers from "./pages/provider/Caregivers";
import CreateCaregiver from "./pages/provider/CreateCaregivers";
import EditCaregiver from "./pages/provider/EditCaregiver";
import Bookings from "./pages/provider/Bookings";
import Profile from "./pages/provider/Profile";

import EditProviderProfile from "./pages/provider/EditProviderProfile";
import ProviderBookingDetails from "./pages/provider/BookingDetails";
import ProviderCaregiverDetails from "./pages/provider/CaregiverDetails";
import CreateCenter from "./pages/provider/CreateCenter";
import ProviderCenterDetails from "./pages/provider/CenterDetails";
import EditCenter from "./pages/provider/EditCenter";

// ================= Admin =================

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdmnDashboardHome from "./pages/admin/DashboardHome";
import AdminProviders from "./pages/admin/Providers";
import AdminCenters from "./pages/admin/Centers";
import AdminBookings from "./pages/admin/Bookings";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminPayments from "./pages/admin/Payments";
import AdminReports from "./pages/admin/Reports";

import AdminLayout from "./components/admin/layout/AdminLayout";

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

      {/* ================= Parent ================= */}

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

        <Route path="dashboard" element={<DashboardHome />} />

        <Route path="bookings/:id" element={<ProviderBookingDetails />} />

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
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdmnDashboardHome />} />

        <Route path="users" element={<AdminUsers />} />

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
