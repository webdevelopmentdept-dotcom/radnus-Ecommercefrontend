import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { newOrder } from "../../actions/orderAction";
import { emptyCart } from "../../actions/cartAction";

const OrderSuccess = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const paymentId = location.state?.paymentId;
  const shippingInfo = location.state?.shippingInfo;
  const cartItems = location.state?.cartItems || [];

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

 useEffect(() => {

  const createOrder = async () => {

    try {

     await dispatch(
  newOrder({
    shippingInfo,
    orderItems: cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    totalPrice,
    paymentInfo: {
      id: paymentId,
      status: "Paid",
    },
  })
);

// dispatch(emptyCart());
navigate("/orders", { replace: true });


    //   if (orderRes?.success) {

    //     dispatch(emptyCart());

    //     navigate("/orders", { replace: true });


    //   }

    } catch (err) {
      console.error(err);
    }

  };

  if (paymentId && cartItems.length > 0) {
    createOrder();
  }

}, []);


  // ⭐ SUCCESS UI IMMEDIATE SHOW
  return (
    <div className="flex flex-col items-center mt-20 gap-6">

      <h1 className="text-2xl font-semibold text-green-600">
        🎉 Order Placed Successfully
      </h1>

      <button
        onClick={() => navigate("/orders")}
        className="bg-primary-orange text-white px-6 py-2 rounded-sm"
      >
        View My Orders
      </button>

    </div>
  );
};

export default OrderSuccess;
