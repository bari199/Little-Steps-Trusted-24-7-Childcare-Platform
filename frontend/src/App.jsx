import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";

// Temporary Dashboard Pages
const ParentDashboard = () => <h1>Parent Dashboard</h1>;
const ProviderDashboard = () => <h1>Provider Dashboard</h1>;
const AdminDashboard = () => <h1>Admin Dashboard</h1>;

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
