import { Outlet } from "react-router-dom";

import ParentSidebar from "./ParentSidebar";
import ParentNavbar from "./ParentNavbar";

const ParentLayout = () => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <ParentSidebar />

      <div className="flex flex-1 flex-col">
        <ParentNavbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
