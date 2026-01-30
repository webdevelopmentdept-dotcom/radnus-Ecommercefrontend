import Sidebar from "../components/User/Sidebar";

const UserLayout = ({ children, activeTab }) => {
  return (
    <div className="flex gap-3">
      <Sidebar activeTab={activeTab} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
