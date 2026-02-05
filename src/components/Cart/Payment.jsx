import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
import { useSnackbar } from "notistack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MetaData from "../Layouts/MetaData";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { emptyCart } from "../../actions/cartAction";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [paymentMethod] = useState("razorpay");
  const [payDisable, setPayDisable] = useState(false);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);


  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPayDisable(true);

    try {
      const { data } = await axios.post("/api/v1/payment/process", {
        amount: totalPrice,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "RadnusOne",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          console.log('---payment---end---');

          dispatch(emptyCart());
          try {
            const verifyRes = await axios.post(
              "/api/v1/payment/verify",
              response
            );

            if (!verifyRes.data.success) {
              enqueueSnackbar("Payment verification failed ❌");
              setPayDisable(false);
              return;
            }

            // ⭐ Navigate to success page
            navigate("/orders/success", {
              state: {
                paymentId: response.razorpay_payment_id,
                cartItems,
                shippingInfo
              }
            });


          } catch (err) {
            enqueueSnackbar("Payment verification error ❌");
            setPayDisable(false);
          }
        },

        modal: {
          ondismiss: function () {
            enqueueSnackbar("Payment cancelled");
            setPayDisable(false);
          },
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function () {
        enqueueSnackbar("Payment failed ❌");
        setPayDisable(false);
      });

      razor.open();

    } catch (err) {
      enqueueSnackbar("Something went wrong ❌");
      setPayDisable(false);
    }
  };

  return (
    <>
      <MetaData title="Radnus: Secure Payment" />

      <main className="w-full mt-20">
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 m-auto">
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
                        label="UPI / Card / NetBanking"
                      />
                    </RadioGroup>
                  </FormControl>

                  <button
                    type="submit"
                    disabled={payDisable}
                    className="bg-primary-orange text-white py-3 rounded-sm"
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
