import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CenterCard = ({ center }) => {
  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <img
        src={
          center.centerImages?.length
            ? center.centerImages[0].url
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={center.centerName}
        className="h-52 w-full object-cover"
      />

      <CardContent className="space-y-4 p-5">
        {/* Name */}
        <div>
          <h2 className="text-xl font-semibold">{center.centerName}</h2>

          <p className="text-sm text-muted-foreground">
            {center.city}, {center.state}
          </p>
        </div>

        {/* Age Group */}
        <p>
          <span className="font-medium">Age Group:</span> {center.ageGroup}
        </p>

        {/* Monthly Fee */}
        <p>
          <span className="font-medium">Monthly Fee:</span> ₹{center.monthlyFee}
        </p>

        {/* Timing */}
        <p>
          <span className="font-medium">Timing:</span>{" "}
          {center.is24Hours
            ? "24 Hours"
            : `${center.openingTime} - ${center.closingTime}`}
        </p>

        {/* Rating */}
        <p>
          <span className="font-medium">Rating:</span> {center.rating} ⭐
        </p>

        {/* Button */}
        <Button asChild className="w-full">
          <Link to={`/parent/centers/${center.slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CenterCard;
