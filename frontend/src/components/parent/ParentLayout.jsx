import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import ParentSidebar from "./ParentSidebar";
import { useTheme } from "../../context/ThemeContext";
import { brand } from "../../components/data/theme";

const ParentLayout = () => {
  const { colors } = useTheme();
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.bg }}>
      <ParentSidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6" style={{ backgroundColor: colors.bg }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
