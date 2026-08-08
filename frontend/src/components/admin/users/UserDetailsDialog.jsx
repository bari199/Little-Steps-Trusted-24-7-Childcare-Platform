import { Mail, ShieldCheck, User, CalendarDays, Hash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const UserDetailsDialog = ({ open, onOpenChange, user }) => {
  if (!user) return null;

  const isActive = user.status === "active";
  const isProvider = user.role === "provider";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden rounded-3xl border border-[#F0E1BE] bg-[#FFFDF7] p-0 text-[#241C0F] shadow-2xl dark:border-[#3A2E17] dark:bg-[#211B10] dark:text-[#FFF6E2]">
        {/* Header */}
        <DialogHeader className="bg-[#FFF6E2] px-6 py-6 dark:bg-[#2A2210]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9500]/15">
              <User className="h-6 w-6 text-[#FF9500]" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold">
                User Details
              </DialogTitle>

              <DialogDescription className="mt-1 text-[#6B5D45] dark:text-[#C9B896]">
                Complete information about this account.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 px-6 pb-6 pt-5">
          {/* Profile summary */}
          <div className="flex items-center justify-between rounded-2xl border border-[#F0E1BE] bg-white p-5 dark:border-[#3A2E17] dark:bg-[#17130C]">
            <div>
              <p className="text-xl font-bold">{user.name}</p>

              <p className="mt-1 text-sm text-[#6B5D45] dark:text-[#C9B896]">
                {user.email}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Badge
                className={
                  isActive
                    ? "border-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "border-0 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                }
              >
                {user.status}
              </Badge>

              <Badge
                variant="outline"
                className="border-[#F0E1BE] capitalize dark:border-[#3A2E17]"
              >
                {user.role}
              </Badge>
            </div>
          </div>

          <Separator className="bg-[#F0E1BE] dark:bg-[#3A2E17]" />

          {/* Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem icon={User} label="Full Name" value={user.name} />

            <InfoItem icon={Mail} label="Email Address" value={user.email} />

            <InfoItem
              icon={ShieldCheck}
              label="Account Status"
              value={user.status}
            />

            <InfoItem
              icon={ShieldCheck}
              label="Provider Approval"
              value={
                isProvider
                  ? user.isApproved
                    ? "Approved"
                    : "Pending"
                  : "Not Applicable"
              }
            />

            <InfoItem icon={Hash} label="User ID" value={user._id} breakValue />

            <InfoItem
              icon={CalendarDays}
              label="Created At"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "Not Available"
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem = ({ icon: Icon, label, value, breakValue = false }) => {
  return (
    <div className="rounded-2xl border border-[#F0E1BE] bg-white p-4 dark:border-[#3A2E17] dark:bg-[#17130C]">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#FF9500]" />

        <p className="text-xs font-medium uppercase tracking-wide text-[#6B5D45] dark:text-[#C9B896]">
          {label}
        </p>
      </div>

      <p
        className={`mt-2 font-semibold ${
          breakValue ? "break-all text-sm" : ""
        }`}
      >
        {value || "Not Available"}
      </p>
    </div>
  );
};

export default UserDetailsDialog;
