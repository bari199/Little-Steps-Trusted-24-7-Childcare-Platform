import UserMenu from "../common/UserMenu";

const ParentNavbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-semibold">Parent Dashboard</h1>

      <UserMenu />
    </header>
  );
};

export default ParentNavbar;
