import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { getDeliveryDate } from "../../utils/functions";
import { saveForLater } from "../../actions/saveForLaterAction";
import { Link } from "react-router-dom";

const CartItem = ({
  product,
  name,
  seller,
  price,        // ✅ THIS
  image,
  stock,
  quantity,
  inCart,
}) => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
 const customerPrice = Number(price || 0);
const totalPrice = customerPrice * quantity;


  const increaseQuantity = (id, quantity, stock) => {
    if (quantity >= stock) {
      enqueueSnackbar("Maximum Order Quantity", { variant: "warning" });
      return;
    }
    dispatch(addItemsToCart(id, quantity + 1));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, quantity - 1));
  };

  const removeCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
    enqueueSnackbar("Product Removed From Cart", { variant: "success" });
  };

  const saveForLaterHandler = (id) => {
    dispatch(saveForLater(id));
    removeCartItem(id);
    enqueueSnackbar("Saved For Later", { variant: "success" });
  };

  return (
   <div className="flex flex-col gap-4 py-4 px-3 sm:px-6 border-b">

      <Link
        to={`/product/${product}`}
        className="flex flex-col sm:flex-row gap-5 items-center sm:items-start w-full group"
      >
        {/* IMAGE */}
   <div className="w-full sm:w-1/5 h-32 sm:h-40 flex items-center justify-center">
  <img
    draggable="false"
    className="max-h-full max-w-full object-contain"
   src={
  image?.startsWith("http")
    ? image
    : `${process.env.REACT_APP_BACKEND_URL}${image}`
}

    alt={name}
  />
</div>


        {/* DESCRIPTION */}
    <div className="flex flex-col gap-3 sm:gap-5 w-full pr-0 sm:pr-6
                items-center sm:items-start
                text-center sm:text-left">


        <div className="flex flex-col sm:flex-row
                gap-2 sm:gap-0
                w-full
                justify-between
                items-center sm:items-start">

            <div className="flex flex-col sm:w-3/5 items-center sm:items-start">

              <p className="group-hover:text-primary-blue">
                {name.length > 42 ? `${name.substring(0, 42)}...` : name}
              </p>
              <span className="text-sm text-gray-500">
                Seller : Radnus {seller}
              </span>
            </div>

           <div className="flex flex-col items-center sm:items-end text-xs sm:text-sm">

              <p className="text-sm">
                Delivery by {getDeliveryDate()} |{" "}
                <span className="text-primary-green">Free</span>
              </p>
              <span className="text-xs text-gray-500">
                7 Days Replacement Policy
              </span>
            </div>
          </div>

          {/* PRICE */}
           <div className="flex flex-col sm:flex-row
                items-center sm:items-baseline
                gap-1 sm:gap-2
                text-lg sm:text-xl font-semibold">


            <span>₹{totalPrice.toLocaleString()}</span>
            <span className="text-sm text-gray-500">
              (₹{customerPrice.toLocaleString()} each)
            </span>
          </div>
        </div>
      </Link>

      {/* ACTIONS */}
     <div className="flex flex-col sm:flex-row
                items-center sm:items-start
                gap-4 sm:gap-6 mt-3">


        {/* QUANTITY */}
        <div className="flex gap-1 items-center">
          <span
            onClick={() => decreaseQuantity(product, quantity)}
            className="w-7 h-7 text-3xl bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer"
          >
            -
          </span>
          <input
            className="w-11 border text-center rounded-sm py-0.5 text-sm"
            value={quantity}
            disabled
          />
          <span
            onClick={() => increaseQuantity(product, quantity, stock)}
            className="w-7 h-7 text-xl bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer"
          >
            +
          </span>
        </div>

       {inCart && (
  <div className="flex gap-4 mt-2">
    <button
      onClick={() => saveForLaterHandler(product)}
      className="font-medium text-sm hover:text-primary-blue"
    >
      SAVE FOR LATER
    </button>

    <button
      onClick={() => removeCartItem(product)}
      className="font-medium text-sm hover:text-red-600"
    >
      REMOVE
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default CartItem;
