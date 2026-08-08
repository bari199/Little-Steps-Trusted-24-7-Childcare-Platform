import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  UsersRound,
  UserCheck,
  UserX,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import UserDetailsDialog from "../../components/admin/users/UserDetailsDialog";
import UserTable from "../../components/admin/users/UserTable";
import Loading from "../../components/common/Loading";

import {
  getAllUsers,
  updateUserStatus,
  approveProvider,
  rejectProvider,
} from "../../services/adminService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      setUsers(response.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query),
    );
  }, [users, search]);

  const statistics = useMemo(() => {
    return {
      total: users.length,

      active: users.filter((user) => user.status === "active").length,

      blocked: users.filter((user) => user.status === "blocked").length,

      pending: users.filter(
        (user) => user.role === "provider" && !user.isApproved,
      ).length,
    };
  }, [users]);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateUserStatus(id, status);

      toast.success(response.message || "User status updated");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user status",
      );
    }
  };

  const handleApproval = async (id, status) => {
    try {
      if (status === "approved") {
        await approveProvider(id);

        toast.success("Provider approved successfully");
      } else {
        await rejectProvider(id);

        toast.success("Provider rejected successfully");
      }

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update provider approval",
      );
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-7"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#FF9500]">
            <UsersRound className="h-4 w-4" />
            Administration
          </div>

          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>

          <p className="mt-2 text-[#6B5D45] dark:text-[#C9B896]">
            Manage registered users, account status and provider approvals.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchUsers}
          className="w-fit gap-2 rounded-xl border-[#F0E1BE] hover:border-[#FF9500] hover:bg-[#FFF6E2] dark:border-[#3A2E17] dark:hover:bg-[#2A2210]"
        >
          <RotateCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={statistics.total}
          icon={UsersRound}
        />

        <StatCard
          title="Active Accounts"
          value={statistics.active}
          icon={UserCheck}
        />

        <StatCard
          title="Blocked Accounts"
          value={statistics.blocked}
          icon={UserX}
        />

        <StatCard
          title="Pending Providers"
          value={statistics.pending}
          icon={ShieldCheck}
        />
      </div>

      {/* Search Area */}
      <div className="rounded-3xl border border-[#F0E1BE] bg-white p-5 shadow-[0_8px_30px_rgba(36,28,15,0.04)] dark:border-[#3A2E17] dark:bg-[#211B10]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold">Registered Accounts</h2>

            <p className="mt-1 text-sm text-[#6B5D45] dark:text-[#C9B896]">
              {filteredUsers.length} of {users.length} users displayed
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5D45] dark:text-[#C9B896]" />

            <Input
              placeholder="Search name, email or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-xl border-[#F0E1BE] bg-[#FFFDF7] pl-10 focus-visible:ring-[#FF9500] dark:border-[#3A2E17] dark:bg-[#17130C]"
            />
          </div>
        </div>
      </div>

      {/* Users */}
      <UserTable
        users={filteredUsers}
        onView={handleView}
        onStatusChange={handleStatusChange}
        onApproval={handleApproval}
      />

      {/* Dialog */}
      <UserDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
      />
    </motion.section>
  );
};

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group rounded-3xl border border-[#F0E1BE] bg-white p-5 shadow-[0_8px_25px_rgba(36,28,15,0.04)] dark:border-[#3A2E17] dark:bg-[#211B10] dark:shadow-none"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B5D45] dark:text-[#C9B896]">{title}</p>

          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF9500]/10 transition group-hover:bg-[#FF9500]/15">
          <Icon className="h-5 w-5 text-[#FF9500]" />
        </div>
      </div>
    </motion.div>
  );
};

export default Users;
