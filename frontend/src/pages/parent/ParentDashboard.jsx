import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { brand } from "../../components/data/theme";

import {
  User,
  Mail,
  Shield,
  BadgeCheck,
  Search,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Clock3,
} from "lucide-react";

import Button from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import Loading from "../../components/common/Loading";
import { getCurrentUser } from "../../services/authService";

const ParentDashboard = () => {
  const hour = new Date().getHours();
  const { colors } = useTheme();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
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

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.borderAccent}`,
  };

  const titleStyle = {
    color: colors.text,
  };

  const textStyle = {
    color: colors.textMuted,
  };

  return (
    <div>
      <div
        className="min-h-screen bg-gradient-to-br bg-amber-50"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          color: colors.text,
        }}
      >
        <div className="container mx-auto px-5 py-8">
          <section className="space-y-8">
            {/* Header */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border bg-white p-8 shadow-lg"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-orange-200/20 blur-3xl" />

              <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

              <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div>
                  <Badge className="mb-4 rounded-full bg-orange-100 px-4 py-1 text-orange-700 hover:bg-orange-100">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Parent Dashboard
                  </Badge>

                  <h1
                    className="text-4xl font-extrabold tracking-tight"
                    style={{ textStyle }}
                  >
                    {greeting},{" "}
                    <span className="text-orange-500">{user?.name}</span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-muted-foreground leading-7">
                    Welcome back to your childcare dashboard. Easily manage
                    bookings, discover trusted childcare centers, and stay
                    connected with your child's care journey.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button asChild size="lg">
                      <Link to="/parent/centers">Explore Centers</Link>
                    </Button>

                    <Button asChild variant="outline" size="lg">
                      <Link to="/parent/my-bookings">View Bookings</Link>
                    </Button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border bg-gradient-to-br from-orange-400 to-amber-400 p-8 text-white shadow-xl"
                >
                  <Clock3 className="mb-5 h-10 w-10" />

                  <p className="text-sm opacity-80">Active Status</p>

                  <h2 className="mt-2 text-3xl font-bold">Welcome Back</h2>

                  <p className="mt-3 max-w-xs text-sm opacity-90">
                    Your family dashboard is ready. Continue managing bookings
                    and childcare services.
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* User Info */}
            <div className="grid gap-6 mt-10 md:grid-cols-2 xl:grid-cols-4">
              {cards.map(({ title, value, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                >
                  <Card
                    className="rounded-3xl border-0 shadow-md hover:shadow-xl transition-all duration-300"
                    style={{ border: colors.borderAccent }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-orange-500" />
                        </div>

                        <Badge variant="secondary">{title}</Badge>
                      </div>

                      <h2 className="mt-8 text-xl font-bold break-all capitalize">
                        {value}
                      </h2>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Quick Actions
                  </h2>

                  <p className="mt-2 text-muted-foreground">
                    Everything you need is just one click away.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2" style={{ cardStyle }}>
                {/* Browse Centers */}
                <Link to="/parent/centers">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group h-full rounded-3xl border p-6 shadow-sm transition-all hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 transition group-hover:scale-110">
                          <Search className="h-7 w-7 text-orange-500" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">Browse Centers</h3>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Discover trusted childcare centers near you and
                            compare facilities before booking.
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="h-6 w-6 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-orange-500" />
                    </div>
                  </motion.div>
                </Link>

                {/* Bookings */}

                <Link to="/parent/my-bookings">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group h-full rounded-3xl border  p-6 shadow-sm transition-all hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:scale-110">
                          <CalendarDays className="h-7 w-7 text-blue-600" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">My Bookings</h3>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            View upcoming childcare sessions and check your
                            booking history.
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="h-6 w-6 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
                    </div>
                  </motion.div>
                </Link>

                {/* Profile */}

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl border  p-6 shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition group-hover:scale-110">
                        <User className="h-7 w-7 text-green-600" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">My Profile</h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Keep your account information updated for a better
                          experience.
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="h-6 w-6 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-green-600" />
                  </div>
                </motion.div>

                {/* Support */}

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl border bg-gradient-to-r from-orange-500 to-amber-400 p-6 text-white shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                        <BadgeCheck className="h-7 w-7" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">Need Help?</h3>

                        <p className="mt-2 text-sm leading-6 text-white/90">
                          Our support team is always here to help you with
                          bookings and childcare services.
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="h-6 w-6 transition-all group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
