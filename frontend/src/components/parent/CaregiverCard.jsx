import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CaregiverCard = ({ caregiver }) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">
      <img
        src={
          caregiver.profileImage?.url ||
          "https://placehold.co/600x400?text=Caregiver"
        }
        alt={caregiver.fullName}
        className="h-60 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div>
          <h2 className="text-xl font-semibold">{caregiver.fullName}</h2>

          <p className="text-sm text-muted-foreground">
            {caregiver.center?.centerName}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Qualification:</strong> {caregiver.qualification}
          </p>

          <p>
            <strong>Experience:</strong> {caregiver.experience} Years
          </p>

          <p>
            <strong>Specialization:</strong>{" "}
            {caregiver.specialization || "General Child Care"}
          </p>
        </div>

        <Button asChild className="w-full">
          <Link to={`/parent/caregivers/${caregiver._id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default CaregiverCard;
