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

// Temporary Dashboard Pages

const ProviderDashboard = () => <h1>Provider Dashboard</h1>;
const AdminDashboard = () => <h1>Admin Dashboard</h1>;

function App() {
  return (
    <Routes>
      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Home />} />

      <Route
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
        path="/parent/dashboard"
        element={
          <ProtectedRoute roles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= Provider ================= */}

      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute roles={["provider"]}>
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= Admin ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
