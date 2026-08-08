import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SubscriptionTable = ({ subscriptions, onView }) => {
  if (!subscriptions.length) {
    return (
      <div
        className="
          flex min-h-[280px]
          items-center justify-center
          rounded-2xl
          border border-dashed border-[#FF9500]/45
          bg-[#FFFDF7]
          dark:bg-[#211B10]
        "
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF9500]/10">
            <Eye className="h-5 w-5 text-[#FF9500]" />
          </div>

          <h2 className="text-lg font-semibold">No Subscriptions Found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            No subscription matches your current search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-[#FF9500]/35
        bg-[#FFFDF7]
        shadow-sm
        dark:bg-[#211B10]
        dark:border-[#FF9500]/40
      "
    >
      <div className="overflow-x-auto">
        <Table className="border-0">
          <TableHeader>
            <TableRow
              className="
                border-0
                bg-[#FFF6E2]
                hover:bg-[#FFF6E2]
                dark:bg-[#2A2210]
                dark:hover:bg-[#2A2210]
              "
            >
              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Parent
              </TableHead>

              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Center
              </TableHead>

              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Plan
              </TableHead>

              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Amount
              </TableHead>

              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Start Date
              </TableHead>

              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                End Date
              </TableHead>

              <TableHead className="font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Status
              </TableHead>

              <TableHead className="text-right font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow
                key={subscription._id}
                className="
                  border-0
                  transition-colors
                  hover:bg-[#FFF6E2]/70
                  dark:hover:bg-[#2A2210]
                "
              >
                <TableCell className="font-medium">
                  {subscription.parent?.name || "N/A"}
                </TableCell>

                <TableCell>
                  {subscription.center?.centerName || "N/A"}
                </TableCell>

                <TableCell>
                  <span className="capitalize">
                    {subscription.planType || "N/A"}
                  </span>
                </TableCell>

                <TableCell className="font-semibold text-[#FF9500]">
                  ₹{subscription.amount ?? 0}
                </TableCell>

                <TableCell>
                  {subscription.startDate
                    ? new Date(subscription.startDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {subscription.endDate
                    ? new Date(subscription.endDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <Badge
                    className="
                      rounded-full
                      border border-[#FF9500]/25
                      bg-[#FF9500]/10
                      px-3
                      py-1
                      text-[#C56F00]
                      hover:bg-[#FF9500]/15
                      dark:text-[#FFB84D]
                    "
                  >
                    {subscription.status || "N/A"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(subscription)}
                    className="
                      h-9
                      gap-2
                      rounded-xl
                      border-[#FF9500]/40
                      bg-transparent
                      text-[#241C0F]
                      hover:bg-[#FF9500]
                      hover:text-white
                      dark:border-[#FF9500]/50
                      dark:text-[#FFF6E2]
                      dark:hover:bg-[#FF9500]
                      dark:hover:text-white
                    "
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubscriptionTable;
