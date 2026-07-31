import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      console.log("Response:", response);
      console.log("Role:", response.user.role);

      toast.success(response.message || "Login successful");

      const role = response.user.role;

      switch (role) {
        case "parent":
          navigate("/parent/dashboard", { replace: true });
          break;

        case "provider":
          navigate("/provider/dashboard", { replace: true });
          break;

        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;

        default:
          navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
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
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
