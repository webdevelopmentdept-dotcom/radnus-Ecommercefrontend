import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";

import { logoutUser } from "../../actions/userAction";

const AdminHeader = ({ setToggleSidebar }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openMenu, setOpenMenu] = useState(false);

  /* ===== OUTSIDE CLICK (DESKTOP DROPDOWN) ===== */
  useEffect(() => {
    const close = () => setOpenMenu(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = (e) => {
  e?.stopPropagation();

  dispatch(logoutUser());   // 🔹 redux + backend logout
  enqueueSnackbar("Logged out successfully", { variant: "success" });

  navigate("/login", { replace: true }); // 🔥 LOGIN page-ku redirect
};


  return (
    <header
      style={{
        height: "64px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-4">
        {/* ✅ MOBILE ☰ BUTTON */}
        <button
          className="sm:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setToggleSidebar(true)}
        >
          <MenuIcon />
        </button>

        {/* DESKTOP ICON */}
        <DashboardIcon className="text-red-600 hidden sm:block" />

        <h5 className="font-bold text-lg m-0">
          Admin Dashboard
        </h5>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex items-center gap-6 ml-10 text-sm font-medium">
          <Link to="/admin/orders" className="flex gap-2 hover:underline">
            <ShoppingBagIcon sx={{ fontSize: 18 }} /> Orders
          </Link>

          <Link to="/admin/products" className="flex gap-2 hover:underline">
            <CategoryIcon sx={{ fontSize: 18 }} /> Products
          </Link>

          <Link to="/admin/users" className="flex gap-2 hover:underline">
            <GroupIcon sx={{ fontSize: 18 }} /> Users
          </Link>

          <Link to="/" className="flex gap-2 hover:underline">
            <HomeIcon sx={{ fontSize: 18 }} /> View Website
          </Link>
        </nav>
      </div>

    
      {/* ===== RIGHT (DESKTOP ONLY) ===== */}
<div className="hidden sm:flex items-center gap-2 font-semibold">
  <AccountCircleIcon className="text-red-600" />
  {user?.name}
</div>

    </header>
  );
};

export default AdminHeader;
