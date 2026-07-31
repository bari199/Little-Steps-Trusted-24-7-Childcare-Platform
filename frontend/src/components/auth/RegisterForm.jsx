import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "parent",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label>Name</Label>

        <Input
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>

        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label>Password</Label>

        <Input
          type="password"
          placeholder="Minimum 8 characters"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <input type="hidden" value="parent" {...register("role")} />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Register"}
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
