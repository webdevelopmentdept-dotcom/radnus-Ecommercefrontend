import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import Loader from "../Layouts/Loader";
import { useSnackbar } from "notistack";
import MetaData from "../Layouts/MetaData";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Sidebar from "../User/Sidebar";
import { NEW_ORDER_RESET } from "../../constants/orderConstants";
import { Helmet } from "react-helmet";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [showMenu, setShowMenu] = useState(false);

  const { orders = [], loading, error } = useSelector(
    (state) => state.myOrders
  );

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, enqueueSnackbar]);

  useEffect(() => {
  dispatch({ type: NEW_ORDER_RESET });
}, [dispatch])

  return (
    <>
   
<MetaData
    title="My Orders | Radnus"
    description="View and track your orders"
    robots="noindex, nofollow"
  />
      <main className="w-full mt-20 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col sm:flex-row gap-6 items-start">

            {/* SIDEBAR SECTION */}
            <div className="w-full sm:w-1/4 sm:sticky sm:top-24 self-start">

              {/* ✅ MOBILE PROFILE HEADER (same as Account page) */}
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
                    <p className="font-medium text-gray-800">
                      {user?.name}
                    </p>
                  </div>
                </div>

                <span className="text-lg">
                  {showMenu ? "▲" : "▼"}
                </span>
              </div>

              {/* ✅ MOBILE SIDEBAR MENU */}
              {showMenu && (
                <div className="mt-2 sm:hidden">
                  <Sidebar
                    activeTab="orders"
                    showProfileCard={false}
                  />
                </div>
              )}

              {/* ✅ DESKTOP SIDEBAR */}
              <div className="hidden sm:block">
                <Sidebar activeTab="orders" />
              </div>
            </div>

            {/* ORDERS CONTENT */}
            <div className="w-full sm:max-w-4xl bg-white rounded-lg shadow p-6">

              <h1 className="text-xl font-semibold mb-6">
                My Orders
              </h1>

              {loading ? (
                <Loader />
              ) : orders.length === 0 ? (
                <div className="bg-white p-8 rounded shadow text-center">
                  <p className="text-lg font-medium">
                    No Orders Found
                  </p>

                  <Link
                    to="/products"
                    className="inline-block mt-4 px-6 py-2 bg-primary-orange text-white rounded hover:shadow"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  {/* ORDERS LIST */}
                  <div className="flex flex-col gap-4">
                    {orders.map((order) => {
                      const item = order.orderItems[0];

                      return (
<Link
  key={order._id}
  to={`/order_details/${order._id}`}
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border hover:shadow transition"
>
                          {/* LEFT */}
                          <div className="flex items-center gap-4">
                            <img
  src={
    item.image?.startsWith("http")
      ? item.image
      : `${process.env.REACT_APP_BACKEND_URL}${item.image}`
  }
  alt={item.name}
  className="w-16 h-16 object-contain rounded"
/>

                            <div>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  order.orderStatus === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {order.orderStatus}
                              </span>

                              <p className="mt-1 font-medium text-sm">
                                {item.name.length > 40
                                  ? item.name.slice(0, 40) + "..."
                                  : item.name}
                              </p>

                              <p className="text-xs text-gray-500">
                                Ordered on{" "}
                                {new Date(
                                  order.createdAt
                                ).toDateString()}
                              </p>
                            </div>
                          </div>

                          {/* RIGHT */}
                           <div className="flex items-center justify-end gap-2 sm:gap-3 sm:justify-normal">
  <p className="font-medium text-sm whitespace-nowrap">
    ₹{order.totalPrice}
  </p>
  <ChevronRightIcon className="text-gray-400" />
</div>

                        </Link>
                      );
                    })}
                  </div>

                  {/* SUPPORT CTA */}
                  <div className="mt-10 bg-white rounded-lg border p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h2 className="font-semibold text-lg">
                        Need help with your order?
                      </h2>
                      <p className="text-sm text-gray-500">
                        Track your order or contact our support team
                      </p>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {orders.length > 0 && (
  <Link
    to={`/order_details/${orders[0]._id}`}
    className="px-4 py-2 border rounded text-sm hover:bg-gray-50"
  >
    Track Order
  </Link>
)}


                      <Link
                        to="/customer-service"
                        className="px-4 py-2 border rounded text-sm hover:bg-gray-50"
                      >
                        Contact Support
                      </Link>

                      <Link
                        to="/products"
                        className="px-4 py-2 bg-primary-orange text-white rounded text-sm hover:shadow"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyOrders;
