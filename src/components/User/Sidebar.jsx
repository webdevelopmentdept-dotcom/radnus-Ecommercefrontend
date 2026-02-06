import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LockIcon from "@mui/icons-material/Lock";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/userAction";

const Sidebar = ({ activeTab, showProfileCard = true }) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    navigate("/login");
  };

  return (
       <div className="w-full">


      {/* PROFILE CARD */}
  {showProfileCard && (
  <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3 mb-4">
    <img
      src={
        user?.avatar?.url
          ? user.avatar.url.startsWith("http")
            ? user.avatar.url
            : `${process.env.REACT_APP_BACKEND_URL}${user.avatar.url}`
          : "/placeholder.png"
      }
      alt="avatar"
      className="w-12 h-12 rounded-full object-cover"
    />

    <div>
      <p className="text-xs text-gray-500">Hello,</p>
      <p className="font-medium text-gray-800">{user?.name}</p>
    </div>
  </div>
)}


      {/* MENU */}
      <div className="bg-white rounded-lg shadow overflow-hidden text-sm">

        <SidebarItem
          icon={<PersonIcon />}
          label="My Profile"
          to="/account"
          active={activeTab === "profile"}
        />

        <SidebarItem
          icon={<ShoppingBagIcon />}
          label="My Orders"
          to="/orders"
          active={activeTab === "orders"}
        />

        <SidebarItem
          icon={<FavoriteIcon />}
          label="Wishlist"
          to="/wishlist"
          active={activeTab === "wishlist"}
        />

        {/* WALLET */}
        <SidebarItem
          icon={<AccountBalanceWalletIcon />}
          label="Wallet"
          to="/wallet"
          active={activeTab === "wallet"}
          rightText="₹0"
        />

        <SidebarItem
          icon={<LockIcon />}
          label="Change Password"
          to="/password/update"
          active={activeTab === "password"}
        />

        {/* LOGOUT */}
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-3 cursor-pointer text-red-600 hover:bg-red-50"
        >
          <PowerSettingsNewIcon fontSize="small" />
          Logout
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, to, active, rightText }) => (
  <Link
    to={to}
    className={`flex items-center justify-between px-5 py-3 border-b last:border-b-0
      ${
        active
          ? "bg-red-50 text-red-600 font-medium"
          : "text-gray-700 hover:bg-gray-50"
      }`}
  >
    <div className="flex items-center gap-3">
      <span className="text-red-500">{icon}</span>
      {label}
    </div>
    {rightText && (
      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
        {rightText}
      </span>
    )}
  </Link>
);

export default Sidebar;
