import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  BadgeCheck,
  Search,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getCurrentUser } from "../../services/authService";

import Loading from "../../components/common/Loading";

const ParentDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const cards = [
    {
      title: "Name",
      value: user?.name || "-",
      icon: User,
    },
    {
      title: "Email",
      value: user?.email || "-",
      icon: Mail,
    },
    {
      title: "Role",
      value: user?.role || "-",
      icon: Shield,
    },
    {
      title: "Status",
      value: user?.status || "Active",
      icon: BadgeCheck,
    },
  ];

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name} 👋</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your profile, browse childcare centers, and track your bookings
          from one place.
        </p>
      </div>

      {/* User Info */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{title}</p>

              <Icon className="h-5 w-5 text-primary" />
            </div>

            <h2 className="break-all text-lg font-semibold capitalize">
              {value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link to="/parent/centers">
              <Search className="mr-2 h-4 w-4" />
              Browse Centers
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link to="/parent/my-bookings">
              <CalendarDays className="mr-2 h-4 w-4" />
              My Bookings
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ParentDashboard;
