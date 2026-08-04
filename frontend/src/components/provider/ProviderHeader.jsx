import useAuth from "@/hooks/useAuth";
import UserMenu from "../common/UserMenu";

const ProviderHeader = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-xl font-semibold">Provider Dashboard</h1>

      <div className="font-medium">{user?.name}</div>
      <UserMenu />
    </header>
  );
};

export default ProviderHeader;
