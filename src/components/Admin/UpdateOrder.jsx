import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { formatDate } from "../../utils/functions";
import TrackStepper from "../Order/TrackStepper";
import Loading from "./Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MetaData from "../Layouts/MetaData";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [courierName, setCourierName] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const { order, error, loading } = useSelector(
    (state) => state.orderDetails
  );
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (updateError) {
      enqueueSnackbar(updateError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("Order updated successfully", {
        variant: "success",
      });
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, updateError, isUpdated, enqueueSnackbar, id]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateOrder(id, {
        status,
        courierName,
        trackingId,
      })
    );
  };

  const isDelivered = order?.orderStatus === "Delivered";

  return (
    <>
      <MetaData title="Admin: Update Order | Radnus" />

      {loading ? (
        <Loading />
      ) : (
        order &&
        order.user &&
        order.shippingInfo && (
          <div className="flex flex-col gap-4">
            <Link
              to="/admin/orders"
              className="ml-1 flex items-center gap-1 font-medium text-primary-blue uppercase"
            >
              <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
              Go Back
            </Link>

            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg">
              {/* LEFT */}
              <div className="sm:w-1/2 border-r">
                <div className="flex flex-col gap-3 my-8 mx-10">
                  <h3 className="font-medium text-lg">
                    Delivery Address
                  </h3>
                  <h4 className="font-medium">
                    {order.user.name}
                  </h4>
                  <p className="text-sm">
                    {order.shippingInfo.address},{" "}
                    {order.shippingInfo.city},{" "}
                    {order.shippingInfo.state} -{" "}
                    {order.shippingInfo.pincode}
                  </p>
                  <p className="text-sm">
                    <b>Email:</b> {order.user.email}
                  </p>
                  <p className="text-sm">
                    <b>Phone:</b>{" "}
                    {order.shippingInfo.phoneNo}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <form
                onSubmit={updateOrderSubmitHandler}
                className="flex flex-col gap-4 p-8 sm:w-1/2"
              >
                <h3 className="font-medium text-lg">
                  Update Order Status
                </h3>

                <p className="text-sm">
                  <b>Current Status:</b>{" "}
                  {order.orderStatus === "Processing" &&
                    `Ordered on ${formatDate(
                      order.createdAt
                    )}`}
                  {order.orderStatus === "Shipped" &&
                    `Shipped on ${formatDate(
                      order.shippedAt
                    )}`}
                  {order.orderStatus === "Delivered" &&
                    `Delivered on ${formatDate(
                      order.deliveredAt
                    )}`}
                </p>

                {/* 🚫 Delivered info */}
                {isDelivered && (
                  <p className="text-green-600 text-sm font-medium">
                    This order has been delivered and is locked.
                  </p>
                )}

                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    disabled={isDelivered}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  >
                    {order.orderStatus === "Processing" && (
                      <MenuItem value="Shipped">
                        Shipped
                      </MenuItem>
                    )}
                    {order.orderStatus === "Shipped" && (
                      <MenuItem value="Delivered">
                        Delivered
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

                {status === "Shipped" && !isDelivered && (
                  <>
                    <input
                      type="text"
                      placeholder="Courier Name"
                      className="border p-2 rounded"
                      value={courierName}
                      onChange={(e) =>
                        setCourierName(e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Tracking ID"
                      className="border p-2 rounded"
                      value={trackingId}
                      onChange={(e) =>
                        setTrackingId(e.target.value)
                      }
                    />
                  </>
                )}

                <button
                  type="submit"
                  disabled={isDelivered}
                  className={`p-2 rounded font-medium text-white ${
                    isDelivered
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-orange hover:shadow-lg"
                  }`}
                >
                  {isDelivered ? "Delivered" : "Update Order"}
                </button>
              </form>
            </div>

            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg px-4 py-5"
              >
                <div className="flex gap-4 sm:w-1/2">
                 <img
  src={
    item.image?.startsWith("http")
      ? item.image
      : `${process.env.REACT_APP_BACKEND_URL}${item.image}`
  }
  alt={item.name}
  className="w-24 h-24 object-contain"
/>

                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-sm">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm">
                      Price: ₹{item.price}
                    </p>
                    <p className="font-medium">
                      Total: ₹
                      {item.quantity * item.price}
                    </p>
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <h3 className="font-medium text-center">
                    Order Tracking
                  </h3>
                  <TrackStepper
                    orderOn={order.createdAt}
                    shippedAt={order.shippedAt}
                    deliveredAt={order.deliveredAt}
                    activeStep={
                      order.orderStatus === "Delivered"
                        ? 2
                        : order.orderStatus === "Shipped"
                        ? 1
                        : 0
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default UpdateOrder;
