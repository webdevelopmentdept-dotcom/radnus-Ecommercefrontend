import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import PrimaryDropDownMenu from "./PrimaryDropDownMenu";

const Header = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  // ===== ORIGINAL STATES – SAME =====
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // ===== MOBILE STATE – NAME RETAIN =====
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  // ===== HEADER TOP CALCULATION MATUM FIX =====
  const [headerTop, setHeaderTop] = useState(
    window.innerWidth >= 640 ? 36 : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setHeaderTop(window.innerWidth >= 640 ? 36 : 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [mobileMenuOpen]);


  // ===== ORIGINAL SCROLL LOGIC – SAME =====
  useEffect(() => {
    const handleScroll = () => {
      const BANNER_THRESHOLD = 420;
      setScrolled(window.scrollY > BANNER_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== ORIGINAL SEARCH SUBMIT – LOGIC AE SAME =====
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchText.trim()) {
      navigate(`/products?search=${searchText.trim()}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      {/* ===== TOP BLACK BAR – ORIGINAL STYLE AE SAME ===== */}
      <div
        className="hidden sm:flex fixed top-0 left-0 w-full z-50 bg-black text-white text-sm"
        style={{ fontFamily: "'Montserrat, sans-serif'" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center gap-8">
          <span>ISO Certified Quality</span>
          <span>Genuine Products</span>
          <span>Bulk Discount</span>
          <span>Fast Dispatch</span>

          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/customer-service")}
          >
            Customer Service
          </span>
        </div>
      </div>

      {/* ===== MOBILE MENU DRAWER – MATUM ALIGNMENT FIX ===== */}
      {mobileMenuOpen && (
  <div
    className="fixed inset-0 bg-black/60 z-[9999] md:hidden"
    onClick={() => setMobileMenuOpen(false)}
  >

            <div
  className="fixed top-0 left-0 h-full w-[260px] max-w-[80vw] bg-white text-black shadow-2xl p-4 flex flex-col gap-4"
  onClick={(e) => e.stopPropagation()}
>

            <Link to="/products?type=accessories" onClick={() => setMobileMenuOpen(false)}>
              Accessories
            </Link>

            <Link to="/products?type=tools" onClick={() => setMobileMenuOpen(false)}>
              Tools
            </Link>

            <Link to="/products?type=combo" onClick={() => setMobileMenuOpen(false)}>
              Combo
            </Link>
          </div>
        </div>
      )}

      {/* ===== MAIN HEADER – ORIGINAL CLASSES NO CHANGE ===== */}
      <header
        className={`
          fixed left-0 w-full z-50 transition-all duration-300
          ${
            isHome
              ? !scrolled
                ? "background-transparent text-white"
                : "bg-black text-white"
              : "bg-white text-black"
          }
        `}
        style={{ top: `${headerTop}px` }}
      >

        {/* ===== DESKTOP HEADER SECTION (FINAL) ===== */}
<div className="relative max-w-7xl mx-auto px-4 py-4 hidden sm:flex items-center">

  {/* LEFT NAV */}
  <div className="flex gap-8 text-lg font-semibold uppercase tracking-wider font-['Montserrat'] ml-12">
    <Link to="/products?type=accessories" className="hover:underline">
      Accessories
    </Link>
    <Link to="/products?type=tools" className="hover:underline">
      Tools
    </Link>
    <Link to="/products?type=combo" className="hover:underline">
      Combo
    </Link>
  </div>

  {/* CENTER LOGO + SEARCH (TRUE CENTER) */}
<div className="absolute left-1/2 -translate-x-[25%] flex items-center gap-6">



    <Link
      to="/"
      className="text-3xl uppercase tracking-[3px] whitespace-nowrap hover:underline"
      style={{ fontFamily: "'Poppins, sans-serif'" }}
    >
      <span className="text-[36px]">R</span>adnus
      <span className="text-[36px]">O</span>ne
    </Link>

    <form
      onSubmit={searchSubmitHandler}
      className="flex items-center shadow rounded-full border bg-white
                 w-[240px] lg:w-[300px] ml-5"
    >
      <input
        placeholder="Search"
        className="flex-1 px-4 py-1.5 text-sm text-black outline-none rounded-l-full"
      />
      <button
        type="submit"
        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-r-full"
      >
        <SearchIcon fontSize="small" />
      </button>
    </form>

  </div>

  {/* RIGHT CART + ACCOUNT */}
  <div className="ml-auto flex items-center gap-4">

    <Link to="/cart" className="hover:underline">
      <ShoppingCartIcon fontSize="small" />
    </Link>

    {isAuthenticated ? (
      <div className="relative">
        <div
          className="cursor-pointer text-sm font-semibold flex items-center gap-1 whitespace-nowrap"
          onClick={() => setOpenUserMenu(!openUserMenu)}
        >
          {user?.name?.split(" ")[0]}
          <ExpandMoreIcon sx={{ fontSize: 16 }} />
        </div>

        {openUserMenu && (
          <PrimaryDropDownMenu
            setTogglePrimaryDropDown={setOpenUserMenu}
            user={user}
          />
        )}
      </div>
    ) : (
      <Link to="/login" className="text-sm font-medium hover:underline">
        Login
      </Link>
    )}

  </div>
</div>


        {/* ===== MOBILE HEADER BAR – ORIGINAL STYLE AE SAME ===== */}
        <div className="flex sm:hidden justify-between items-center px-4 py-3">

          <MenuIcon
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          />

          <Link to="/">
            <span
              className="text-lg uppercase tracking-[2px]"
              style={{ fontFamily: "'Poppins, sans-serif'" }}
            >
              RADNUSONE
            </span>
          </Link>

        <div className="flex items-center gap-3">

  <SearchIcon
    className="cursor-pointer text-[20px]"
    onClick={() => navigate("/products")}
  />

  {isAuthenticated && user ? (
    <img
      src={user?.avatar?.url}
      className="w-[24px] h-[24px] rounded-full cursor-pointer"
      onClick={() => navigate("/account")}
    />
  ) : (
    <AccountCircleIcon
      className="cursor-pointer text-[20px]"
      onClick={() => navigate("/login")}
    />
  )}

  <ShoppingCartIcon
    className="cursor-pointer text-[20px]"
    onClick={() => navigate("/cart")}
  />
          </div>
        </div>

      </header>

    </>
  );
};

export default Header;
