import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

// ✅ CORRECT IMPORT PATH (IMPORTANT)
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";

const Product = (props) => {
  // ✅ DEFAULT VALUES – avoids toLocaleString crash
 const {
  _id,
  name,
  images = [],
  ratings = 0,
  numOfReviews = 0,
  price = 0,
} = props;



  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);

let displayPrice = price;



  // ✅ SAFE REDUX ACCESS
  const { wishlistItems = [] } = useSelector((state) => state.wishlist);

  const itemInWishlist = wishlistItems.some((i) => i.product === _id);

  const addToWishlistHandler = () => {
    if (!_id) return;

    if (itemInWishlist) {
      dispatch(removeFromWishlist(_id));
      enqueueSnackbar("Removed from wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(_id));
      enqueueSnackbar("Added to wishlist", { variant: "success" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 px-2 py-6 relative">
      <Link
        to={`/product/${_id}`}
        className="flex flex-col items-center text-center group"
      >
        <div className="w-36 h-36">
          <img
            draggable="false"
            className="w-full h-full object-contain"
            src={images?.[0]?.url || "/placeholder.png"}
            alt={name}
          />
        </div>

        <h2 className="text-sm mt-4 group-hover:text-primary-blue">
          {name.length > 50 ? `${name.substring(0, 50)}...` : name}
        </h2>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
          <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
            {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
          </span>
          <span>({numOfReviews.toLocaleString()})</span>
        </span>

        <div className="flex items-center gap-1.5 text-md font-medium">
          <span>₹{displayPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* WISHLIST ICON */}
      <span
        onClick={addToWishlistHandler}
        className={`${
          itemInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"
        } absolute top-5 right-2 cursor-pointer`}
      >
        <FavoriteIcon sx={{ fontSize: "16px" }} />
      </span>
    </div>
  );
};

export default Product;