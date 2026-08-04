import { Outlet } from "react-router-dom";
import ProviderSidebar from "./ProviderSidebar";
import ProviderHeader from "./ProviderHeader";

const ProviderLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProviderSidebar />

      <div className="flex flex-1 flex-col">
        <ProviderHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
