import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../../actions/userAction";

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logoutUser());

    navigate("/login");

    enqueueSnackbar("Logout Successfully", { variant: "success" });

    // 🔴 THIS LINE MUST USE SAME PROP NAME
    setTogglePrimaryDropDown(false);
  };

  if (!user) return null;

  return (
   <div className="absolute right-0 top-9 w-60 bg-white shadow-xl border border-gray-200 rounded-md text-sm overflow-hidden z-[9999] text-black">


      {/* ================= ADMIN ================= */}
      {user.role === "admin" && (
        <Link
          to="/admin/dashboard"
          onClick={() => setTogglePrimaryDropDown(false)}
          className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50"
        >
          <span className="text-red-600">
            <DashboardIcon sx={{ fontSize: 18 }} />
          </span>
          Admin Dashboard
        </Link>
      )}

      {/* ================= COMMON PROFILE ================= */}
      <Link
        to={user.role === "admin" ? "/admin/profile" : "/account"}
        onClick={() => setTogglePrimaryDropDown(false)}
        className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50"
      >
        <span className="text-red-600">
          <AccountCircleIcon sx={{ fontSize: 18 }} />
        </span>
        My Profile
      </Link>

      {/* ================= CUSTOMER ONLY ================= */}
      {user.role !== "admin" && (
        <>
          <Link
            to="/orders"
            onClick={() => setTogglePrimaryDropDown(false)}
            className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50"
          >
            <span className="text-red-600">
              <ShoppingBagIcon sx={{ fontSize: 18 }} />
            </span>
            My Orders
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setTogglePrimaryDropDown(false)}
            className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-50"
          >
            <span className="text-red-600">
              <FavoriteIcon sx={{ fontSize: 18 }} />
            </span>
            Wishlist
            <span className="ml-auto bg-gray-100 px-2 py-0.5 text-xs rounded">
              {wishlistItems.length}
            </span>
          </Link>
        </>
      )}

      {/* ================= LOGOUT ================= */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer text-red-600"
      >
        <PowerSettingsNewIcon sx={{ fontSize: 18 }} />
        Logout
      </div>

    </div>
  );
};

export default PrimaryDropDownMenu;
