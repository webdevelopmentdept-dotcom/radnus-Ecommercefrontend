import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";




const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [paymentMethod] = useState("razorpay");
  const [payDisable, setPayDisable] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { success, error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  
useEffect(() => {
  if (success) {
    navigate("/orders", { replace: true });
        setTimeout(() => {
      dispatch({ type: NEW_ORDER_RESET });
    }, 0);
    // dispatch({ type: NEW_ORDER_RESET });
  }
}, [success, navigate, dispatch]);


  const submitHandler = async (e) => {
    e.preventDefault();
    setPayDisable(true);
    const API = process.env.REACT_APP_API_URL;


    try {
      // 1️⃣ Create Razorpay Order
      const res = await fetch(
          `${API}/api/v1/payment/process`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalPrice }),
        }
      );

      const data = await res.json();

      if (!data.success || !data.order) {
        enqueueSnackbar("Unable to initiate payment", { variant: "error" });
        setPayDisable(false);
        return;
      }

      // 2️⃣ Razorpay Options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "RadnusOne",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            console.log("HANDLER CALLED");
            navigate("/orders", { replace: true });

            const verifyRes = await  fetch(
              `${API}/api/v1/payment/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              navigate("/orders/success", {
              replace: true,
              state: { success: false },
            });
              // enqueueSnackbar("Payment verification failed", { variant: "error" });
              // setPayDisable(false);
              
              return;
            }

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
                  id: response.razorpay_payment_id,
                  status: "Paid",
                },
              })
            );

            enqueueSnackbar("Order placed successfully ✅", { variant: "success" });

            dispatch(emptyCart());
            // dispatch({ type: NEW_ORDER_RESET });



            // navigate("/orders", { replace: true });

            // // 🔥 Guaranteed redirect
            // setTimeout(() => {
            //   window.location.replace("/orders");
            // }, 500);

          } catch (err) {
            enqueueSnackbar("Payment verification error", { variant: "error" });
            setPayDisable(false);
          }
        },



        modal: {
          ondismiss: function () {
            enqueueSnackbar("Payment cancelled", { variant: "info" });
            setPayDisable(false);
          },
        },

        theme: { color: "#0f172a" },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function () {
        enqueueSnackbar("Payment failed", { variant: "error" });
        setPayDisable(false);
      });

      razor.open();
    } catch (err) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      setPayDisable(false);
    }
  };



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
                    <RadioGroup value={paymentMethod}>
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
                    className={`${payDisable
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