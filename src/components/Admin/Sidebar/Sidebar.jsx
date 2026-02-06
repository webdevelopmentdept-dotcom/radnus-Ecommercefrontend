import { Link, useNavigate } from "react-router-dom";
import React from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../../actions/userAction";

const navMenu = [
  { icon: <EqualizerIcon />, label: "Dashboard", ref: "/admin/dashboard" },
  { icon: <ShoppingBagIcon />, label: "Orders", ref: "/admin/orders" },
  { icon: <InventoryIcon />, label: "Products", ref: "/admin/products" },
  { icon: <AddBoxIcon />, label: "Add Product", ref: "/admin/new_product" },
  { icon: <GroupIcon />, label: "Users", ref: "/admin/users" },
  {
    icon: <AccountBalanceWalletIcon />,
    label: "Wallets",
    ref: "/admin/wallets",
  },
  { icon: <ReviewsIcon />, label: "Reviews", ref: "/admin/reviews" },
  { icon: <LogoutIcon />, label: "Logout" },
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/login");
  };

  return (
 <aside
  className="
    fixed sm:sticky
    top-16
    left-0
    h-[calc(100vh-64px)]
    w-64
    bg-gray-800
    text-white
    border-r
    z-40
    overflow-y-auto        /* ✅ THIS IS THE FIX */
  "
>


      {/* USER INFO */}
      <div className="flex items-center gap-3 bg-gray-700 p-4">
        <Avatar
  src={
    user?.avatar?.url
      ? user.avatar.url.startsWith("http")
        ? user.avatar.url
        : `${process.env.REACT_APP_BACKEND_URL}${user.avatar.url}`
      : "/placeholder.png"
  }
/>

        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-gray-300">{user?.email}</div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col mt-4">
        {navMenu.map((item, index) =>
          item.label === "Logout" ? (
            <button
              key={item.label}
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-700"
            >
              {item.icon}
              {item.label}
            </button>
          ) : (
           <Link
  key={item.label}
  to={item.ref}
  onClick={() => setToggleSidebar && setToggleSidebar(false)}
  className={`flex items-center gap-3 px-5 py-3
    ${activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"}
  `}
>
  {item.icon}
  {item.label}
</Link>

          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
