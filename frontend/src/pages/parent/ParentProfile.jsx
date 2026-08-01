import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

const ParentProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="text-muted-foreground">View your account information.</p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>

            <h2 className="text-lg font-semibold">{user?.name}</h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <h2 className="text-lg font-semibold">{user?.email}</h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>

            <h2 className="text-lg font-semibold capitalize">{user?.role}</h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Account Status</p>

            <h2 className="text-lg font-semibold capitalize">{user?.status}</h2>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Approval</p>

            <h2 className="text-lg font-semibold">
              {user?.isApproved ? "Approved" : "Pending"}
            </h2>

            <Button asChild>
              <Link to="/parent/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
