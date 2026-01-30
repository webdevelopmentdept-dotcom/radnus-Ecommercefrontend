import { useState } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import Sidebar from "../User/Sidebar";
import Product from "./Product";
import emptyWishlistImg from "../../assets/images/empty.png";


const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <MetaData title="Wishlist | Radnus" />

      <main className="w-full mt-20 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col sm:flex-row gap-6 items-start">

            {/* 🔹 SIDEBAR SECTION */}
            <div className="w-full sm:w-1/4 sm:sticky sm:top-24 self-start">

              {/* ✅ MOBILE PROFILE HEADER */}
              <div
                className="sm:hidden bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar?.url}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs text-gray-500">Hello,</p>
                    <p className="font-medium text-gray-800">{user?.name}</p>
                  </div>
                </div>

                <span className="text-lg">{showMenu ? "▲" : "▼"}</span>
              </div>

              {/* ✅ MOBILE SIDEBAR DROPDOWN */}
              {showMenu && (
                <div className="mt-2 sm:hidden">
                  <Sidebar activeTab="wishlist" showProfileCard={false} />
                </div>
              )}

              {/* ✅ DESKTOP SIDEBAR */}
              <div className="hidden sm:block">
                <Sidebar activeTab="wishlist" />
              </div>
            </div>

            {/* 🔹 WISHLIST CONTENT */}
            <div className="w-full sm:max-w-4xl bg-white rounded-lg shadow">

              <div className="flex flex-col">
                <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                  My Wishlist ({wishlistItems.length})
                </span>

              {wishlistItems.length === 0 && (
  <div className="flex items-center flex-col gap-2 m-6">
    <img
      draggable="false"
      className="object-contain w-52 h-44"
      src={emptyWishlistImg}
      alt="Empty Wishlist"
    />
    <span className="text-lg font-medium mt-6">
      Empty Wishlist
    </span>
    <p>You have no items in your wishlist. Start adding!</p>
  </div>
)}

                {wishlistItems
                  .map((item, index) => (
                    <Product
                      key={index}
                      product={item.product}
                      name={item.name}
                      price={item.price || 0}
                      cuttedPrice={item.cuttedPrice || 0}
                      image={item.image}
                      ratings={item.ratings || 0}
                      reviews={item.reviews || 0}
                    />
                  ))
                  .reverse()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wishlist;
