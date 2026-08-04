import { Link } from "react-router-dom";
import { toast } from "sonner";

import { deleteCaregiver } from "../../../services/caregiverService";

import { Button } from "@/components/ui/button";

const ProviderCaregiverTable = ({ caregivers, onRefresh }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this caregiver?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCaregiver(id);

      toast.success(response.message);

      onRefresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete caregiver",
      );
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>

            <th>Name</th>

            <th>Qualification</th>

            <th>Experience</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {caregivers.map((caregiver) => (
            <tr key={caregiver._id}>
              <td>
                <img
                  src={caregiver.profileImage?.url || "/default-avatar.png"}
                  alt={caregiver.fullName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </td>
              <td>
                <div className="font-semibold">{caregiver.fullName}</div>

                {caregiver.specialization && (
                  <div className="text-xs text-gray-500">
                    {caregiver.specialization}
                  </div>
                )}
              </td>
              <td>{caregiver.qualification}</td>
              <td>{caregiver.experience} Years</td>
              <td>
                <span
                  className={`badge ${
                    caregiver.isAvailable ? "badge-success" : "badge-error"
                  }`}
                >
                  {caregiver.isAvailable ? "Available" : "Unavailable"}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/provider/caregivers/${caregiver._id}`}>
                      View
                    </Link>
                  </Button>

                  <Button size="sm" asChild>
                    <Link to={`/provider/caregivers/edit/${caregiver._id}`}>
                      Edit
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(caregiver._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderCaregiverTable;
