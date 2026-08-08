import { motion } from "framer-motion";
import { Eye, UserCheck, UserX, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserTable = ({ users, onView, onStatusChange, onApproval }) => {
  if (!users.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[#E6D5AD] bg-[#FFFDF7] px-6 py-16 text-center dark:border-[#3A2E17] dark:bg-[#211B10]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF9500]/10">
          <UserX className="h-6 w-6 text-[#FF9500]" />
        </div>

        <h3 className="mt-4 text-lg font-bold">No Users Found</h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-[#6B5D45] dark:text-[#C9B896]">
          No users match your current search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#F0E1BE] bg-white shadow-[0_10px_35px_rgba(36,28,15,0.06)] dark:border-[#3A2E17] dark:bg-[#211B10] dark:shadow-none">
      {/* Header */}
      <div className="hidden grid-cols-[2fr_1.2fr_1fr_1fr_1.5fr] gap-4 border-b border-[#F0E1BE] bg-[#FFF6E2] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B5D45] md:grid dark:border-[#3A2E17] dark:bg-[#2A2210] dark:text-[#C9B896]">
        <span>User</span>
        <span>Role</span>
        <span>Status</span>
        <span>Approval</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="divide-y divide-[#F0E1BE] dark:divide-[#3A2E17]">
        {users.map((user, index) => {
          const initials =
            user.name
              ?.split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "U";

          const isActive = user.status === "active";
          const isProvider = user.role === "provider";

          return (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.03,
              }}
              className="grid gap-5 px-6 py-5 md:grid-cols-[2fr_1.2fr_1fr_1fr_1.5fr] md:items-center"
            >
              {/* User */}
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border border-[#F0E1BE] dark:border-[#3A2E17]">
                  <AvatarFallback className="bg-[#FF9500]/10 font-bold text-[#FF9500]">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>

                  <p className="truncate text-sm text-[#6B5D45] dark:text-[#C9B896]">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div>
                <p className="mb-1 text-xs text-[#6B5D45] md:hidden dark:text-[#C9B896]">
                  Role
                </p>

                <Badge
                  variant="outline"
                  className="border-[#F0E1BE] capitalize dark:border-[#3A2E17]"
                >
                  {user.role}
                </Badge>
              </div>

              {/* Status */}
              <div>
                <p className="mb-1 text-xs text-[#6B5D45] md:hidden dark:text-[#C9B896]">
                  Status
                </p>

                <Badge
                  className={
                    isActive
                      ? "border-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "border-0 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                  }
                >
                  {user.status}
                </Badge>
              </div>

              {/* Approval */}
              <div>
                <p className="mb-1 text-xs text-[#6B5D45] md:hidden dark:text-[#C9B896]">
                  Approval
                </p>

                {isProvider ? (
                  <Badge
                    className={
                      user.isApproved
                        ? "border-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "border-0 bg-[#FFF3CD] text-[#9A6700] dark:bg-[#3A2E17] dark:text-[#FFC300]"
                    }
                  >
                    {user.isApproved ? "Approved" : "Pending"}
                  </Badge>
                ) : (
                  <span className="text-sm text-[#6B5D45] dark:text-[#C9B896]">
                    —
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-start gap-2 md:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(user)}
                  className="gap-2 rounded-xl border-[#F0E1BE] bg-transparent hover:border-[#FF9500] hover:bg-[#FFF6E2] dark:border-[#3A2E17] dark:hover:bg-[#2A2210]"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>

                <Button
                  size="sm"
                  variant={isActive ? "destructive" : "default"}
                  onClick={() =>
                    onStatusChange(user._id, isActive ? "blocked" : "active")
                  }
                  className="gap-2 rounded-xl"
                >
                  {isActive ? (
                    <>
                      <UserX className="h-4 w-4" />
                      Block
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4" />
                      Activate
                    </>
                  )}
                </Button>

                {isProvider && (
                  <Button
                    size="sm"
                    variant={user.isApproved ? "destructive" : "default"}
                    onClick={() =>
                      onApproval(
                        user._id,
                        user.isApproved ? "rejected" : "approved",
                      )
                    }
                    className="gap-2 rounded-xl"
                  >
                    <ShieldCheck className="h-4 w-4" />

                    {user.isApproved ? "Reject" : "Approve"}
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTable;
