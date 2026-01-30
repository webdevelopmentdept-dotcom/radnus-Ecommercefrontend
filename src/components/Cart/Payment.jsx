import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
import { clearErrors, newOrder } from "../../actions/orderAction";
import { useSnackbar } from "notistack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MetaData from "../Layouts/MetaData";
import { emptyCart } from "../../actions/cartAction";
import { NEW_ORDER_RESET } from "../../constants/orderConstants";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [payDisable, setPayDisable] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error, success } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPayDisable(true);

    try {
      // 1️⃣ Create Razorpay order
      const response = await fetch("/api/v1/payment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const data = await response.json();

      if (!data || !data.order) {
        alert("Payment order creation failed");
        setPayDisable(false);
        return;
      }

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "RadnusOne",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/v1/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              alert("Payment verification failed");
              setPayDisable(false);
              return;
            }

            // ✅ Create order only after verify success
            dispatch(
              newOrder({
                shippingInfo,
                orderItems: cartItems,
                totalPrice,
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  status: "Paid",
                },
              })
            );
          } catch (err) {
            alert("Payment verification error");
            setPayDisable(false);
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
            setPayDisable(false);
          },
        },

        theme: { color: "#0f172a" },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function () {
        alert("Payment Failed");
        setPayDisable(false);
      });

      razor.open();
    } catch (error) {
      alert("Something went wrong");
      setPayDisable(false);
    }
  };

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Order placed successfully", {
        variant: "success",
      });

      dispatch(emptyCart());
      dispatch({ type: NEW_ORDER_RESET });
      navigate("/orders");
    }

    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: "error" });
      setPayDisable(false);
    }
  }, [success, error, dispatch, enqueueSnackbar, navigate]);

  return (
    <>
      <MetaData title="Radnus: Secure Payment" />

      <main className="w-full mt-20">
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 m-auto sm:mb-7">
          <div className="flex-1">
            <Stepper activeStep={3}>
              <div className="w-full bg-white">
                <form
                  onSubmit={submitHandler}
                  className="flex flex-col gap-4 w-full px-6 py-4"
                >
                  <FormControl>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="razorpay"
                        control={<Radio />}
                        label="UPI / Credit / Debit / NetBanking"
                      />
                    </RadioGroup>
                  </FormControl>

                  <button
                    type="submit"
                    disabled={payDisable}
                    className={`${
                      payDisable
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-orange hover:shadow-lg"
                    } w-full sm:w-1/3 py-3 font-medium text-white rounded-sm`}
                  >
                    PLACE ORDER
                  </button>
                </form>
              </div>
            </Stepper>
          </div>

          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;