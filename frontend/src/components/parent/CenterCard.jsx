import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CenterCard = ({ center }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-[#F0E1BE] dark:border-[#3A2E17] dark:bg-[#211B10]">
        <img
          src={
            center.centerImages?.length
              ? center.centerImages[0].url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={center.centerName}
          className="h-52 w-full object-cover"
        />

        <CardContent className="space-y-3 p-5">
          <div>
            <h2 className="text-xl font-semibold text-[#241C0F] dark:text-[#FFF6E2]">
              {center.centerName}
            </h2>
            <p className="text-sm text-[#6B5D45] dark:text-[#C9B896]">
              {center.city}, {center.state}
            </p>
          </div>

          <div className="space-y-1.5 text-sm text-[#6B5D45] dark:text-[#C9B896]">
            <p>
              <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
                Age group:
              </span>{" "}
              {center.ageGroup}
            </p>
            <p>
              <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
                Monthly fee:
              </span>{" "}
              ₹{center.monthlyFee}
            </p>
            <p>
              <span className="font-medium text-[#241C0F] dark:text-[#FFF6E2]">
                Timing:
              </span>{" "}
              {center.is24Hours
                ? "24 hours"
                : `${center.openingTime} - ${center.closingTime}`}
            </p>
          </div>

          <p className="flex items-center gap-1 text-sm font-medium text-[#241C0F] dark:text-[#FFF6E2]">
            <Star className="h-4 w-4 fill-[#FF9500] text-[#FF9500]" />{" "}
            {center.rating}
          </p>

          <Button
            asChild
            className="w-full bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F] hover:opacity-90"
          >
            <Link to={`/parent/centers/${center.slug}`}>View details</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CenterCard;
