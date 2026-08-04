import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CenterCard = ({ center }) => {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <img
        src={center.centerImages?.[0]?.url || "https://placehold.co/600x350"}
        alt={center.centerName}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{center.centerName}</h2>

          <Badge>{center.status}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          {center.city}, {center.state}
        </p>

        <Link to={`/provider/center/${center._id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default CenterCard;
