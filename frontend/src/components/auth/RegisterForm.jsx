import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, User, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAuth from "../../hooks/useAuth";

const inputClass =
  "border-[#F0E1BE] focus-visible:ring-[#FF9500] focus-visible:border-[#FF9500] dark:border-[#3A2E17] dark:bg-[#2A2210] dark:text-[#FFF6E2] dark:placeholder:text-[#8A7A5C]";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "parent",
      phone: "",
      address: "",
      qualification: "",
      experience: "",
      governmentId: "",
    },
  });

  const role = watch("role");

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (data.role === "provider") {
        payload.phone = data.phone;
        payload.address = data.address;
        payload.qualification = data.qualification;
        payload.experience = Number(data.experience);
        payload.governmentId = data.governmentId;
      }

      const response = await registerUser(payload);

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Role */}
      <div className="space-y-2">
        <Label className="dark:text-[#FFF6E2]">Register as</Label>

        <div className="grid grid-cols-2 gap-2 rounded-full bg-[#FFF6E2] p-1 dark:bg-[#2A2210]">
          {[
            {
              value: "parent",
              label: "Parent",
              icon: User,
            },
            {
              value: "provider",
              label: "Provider",
              icon: Briefcase,
            },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
                role === opt.value
                  ? "bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F]"
                  : "text-[#6B5D45] dark:text-[#C9B896]"
              }`}
            >
              <input
                type="radio"
                value={opt.value}
                className="hidden"
                {...register("role")}
              />

              <opt.icon className="h-3.5 w-3.5" />

              {opt.label}
            </label>
          ))}
        </div>
      </div>
      {/* Name */}
      <div className="space-y-2">
        <Label className="dark:text-[#FFF6E2]">Full name</Label>

        <Input
          placeholder="Enter your full name"
          className={inputClass}
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
        <Label className="dark:text-[#FFF6E2]">Email</Label>

        <Input
          type="email"
          placeholder="Enter your email"
          className={inputClass}
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
        <Label className="dark:text-[#FFF6E2]">Password</Label>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 8 characters"
            className={`${inputClass} pr-10`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5D45] dark:text-[#C9B896]"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      {/* Provider Fields */}
      {role === "provider" && (
        <>
          <div className="space-y-2">
            <Label className="dark:text-[#FFF6E2]">Phone number</Label>

            <Input
              placeholder="Enter your phone number"
              className={inputClass}
              {...register("phone", {
                required: "Phone number is required",
              })}
            />

            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
            <Label className="dark:text-[#FFF6E2]">Address</Label>

            <Input
              placeholder="Enter your address"
              className={inputClass}
              {...register("address", {
                required: "Address is required",
              })}
            />

            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Qualification */}
          <div className="space-y-2">
            <Label className="dark:text-[#FFF6E2]">Qualification</Label>

            <Input
              placeholder="Enter your qualification"
              className={inputClass}
              {...register("qualification", {
                required: "Qualification is required",
              })}
            />

            {errors.qualification && (
              <p className="text-sm text-red-500">
                {errors.qualification.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="dark:text-[#FFF6E2]">Experience (Years)</Label>

            <Input
              type="number"
              placeholder="Enter experience"
              className={inputClass}
              {...register("experience", {
                required: "Experience is required",
              })}
            />

            {errors.experience && (
              <p className="text-sm text-red-500">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Government ID */}
          <div className="space-y-2">
            <Label className="dark:text-[#FFF6E2]">Government ID</Label>

            <Input
              placeholder="Enter government ID"
              className={inputClass}
              {...register("governmentId")}
            />
          </div>
        </>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#FF9500] to-[#FFC300] font-semibold text-[#241C0F] hover:opacity-90"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-[#6B5D45] dark:text-[#C9B896]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-[#FF9500] hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
