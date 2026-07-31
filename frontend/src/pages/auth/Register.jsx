import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout title="Create Account" subtitle="Register to get started">
      <h2>Register Form</h2>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
