import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import AdminHeader from "./AdminHeader";

const Dashboard = ({ activeTab, children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      
      {/* HEADER */}
      <AdminHeader setToggleSidebar={setToggleSidebar} />

      {/* MOBILE SIDEBAR */}
      {toggleSidebar && (
        <Sidebar
          activeTab={activeTab}
          setToggleSidebar={setToggleSidebar}
        />
      )}

      {/* DESKTOP LAYOUT */}
      <div className="sm:flex">
        
        {/* DESKTOP SIDEBAR */}
        <div className="hidden sm:block sm:w-1/5">
          <Sidebar activeTab={activeTab} />
        </div>

        {/* MAIN CONTENT SCROLL ONLY */}
        <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
