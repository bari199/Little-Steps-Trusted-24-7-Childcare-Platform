import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { updateProfile } from "../../services/authService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(data);

      updateUser(response.user);

      toast.success(response.message);

      navigate("/parent/profile", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-3xl font-bold">Edit Profile</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border bg-white p-6"
      >
        <div className="space-y-2">
          <Label>Name</Label>

          <Input
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>

          <Input value={user?.email} disabled />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
