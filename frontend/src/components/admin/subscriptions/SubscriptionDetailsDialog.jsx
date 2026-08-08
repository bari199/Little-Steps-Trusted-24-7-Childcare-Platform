import { CalendarDays, CreditCard, MapPin, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

const SubscriptionDetailsDialog = ({ open, onOpenChange, subscription }) => {
  if (!subscription) return null;

  const status = subscription.status || "N/A";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          border border-[#FF9500]/40
          bg-[#FFFDF7]
          p-6
          shadow-[0_20px_60px_rgba(36,28,15,0.15)]
          dark:bg-[#211B10]
          dark:border-[#FF9500]/45
        "
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF9500]/10">
              <CreditCard className="h-5 w-5 text-[#FF9500]" />
            </span>
            Subscription Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Parent */}
          <div className="rounded-2xl bg-[#FFF6E2] p-5 dark:bg-[#2A2210]">
            <div className="mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-[#FF9500]" />
              <h3 className="font-semibold">Parent Information</h3>
            </div>

            <p className="font-medium">{subscription.parent?.name || "N/A"}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {subscription.parent?.email || "N/A"}
            </p>
          </div>

          {/* Center */}
          <div className="rounded-2xl bg-[#FFF6E2] p-5 dark:bg-[#2A2210]">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FF9500]" />
              <h3 className="font-semibold">Center Information</h3>
            </div>

            <p className="font-medium">
              {subscription.center?.centerName || "N/A"}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {subscription.center?.city || "N/A"}
            </p>
          </div>

          {/* Plan */}
          <div className="rounded-2xl bg-[#FFF6E2] p-5 dark:bg-[#2A2210]">
            <h3 className="mb-3 font-semibold">Plan Details</h3>

            <p>
              <span className="text-sm text-muted-foreground">Plan</span>

              <span className="mt-1 block font-medium capitalize">
                {subscription.planType || "N/A"}
              </span>
            </p>

            <p className="mt-3">
              <span className="text-sm text-muted-foreground">Amount</span>

              <span className="mt-1 block text-lg font-bold text-[#FF9500]">
                ₹{subscription.amount ?? 0}
              </span>
            </p>
          </div>

          {/* Dates */}
          <div className="rounded-2xl bg-[#FFF6E2] p-5 dark:bg-[#2A2210]">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#FF9500]" />

              <h3 className="font-semibold">Subscription Period</h3>
            </div>

            <p>
              <span className="text-sm text-muted-foreground">Start</span>

              <span className="mt-1 block font-medium">
                {subscription.startDate
                  ? new Date(subscription.startDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>

            <p className="mt-3">
              <span className="text-sm text-muted-foreground">End</span>

              <span className="mt-1 block font-medium">
                {subscription.endDate
                  ? new Date(subscription.endDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
          </div>

          {/* Status */}
          <div className="rounded-2xl bg-[#FFF6E2] p-5 dark:bg-[#2A2210]">
            <h3 className="mb-3 font-semibold">Status</h3>

            <Badge
              className="
                rounded-full
                border border-[#FF9500]/30
                bg-[#FF9500]/10
                px-4 py-1.5
                text-[#C56F00]
                dark:text-[#FFB84D]
              "
            >
              {status}
            </Badge>
          </div>

          {/* Created */}
          <div className="rounded-2xl bg-[#FFF6E2] p-5 dark:bg-[#2A2210]">
            <h3 className="mb-3 font-semibold">Created</h3>

            <p className="text-sm text-muted-foreground">
              {subscription.createdAt
                ? new Date(subscription.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDetailsDialog;
