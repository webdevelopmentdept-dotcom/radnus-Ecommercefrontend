import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../actions/wishlistAction";
import { getDiscount } from "../../utils/functions";

const Product = ({
  product,
  name = "",
  price = 0,
  cuttedPrice = 0,
  image = "",
  ratings = 0,
  reviews = 0,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(removeFromWishlist(product));
  };

  return (
    <div className="flex gap-4 border-b p-4 w-full">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-contain"
      />

      <div className="flex flex-col gap-3 flex-1">
        <Link to={`/product/${product}`}>
          <p className="font-medium hover:text-primary-blue">
            {name}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-green-600 text-white px-1 flex items-center gap-1">
              {ratings} <StarIcon sx={{ fontSize: 14 }} />
            </span>
            <span>({reviews.toLocaleString()})</span>
          </div>
        </Link>

        <div className="flex gap-2 items-center">
          <span className="text-xl font-semibold">
            ₹{price.toLocaleString()}
          </span>
          {cuttedPrice > 0 && (
            <>
              <span className="line-through text-gray-500">
                ₹{cuttedPrice.toLocaleString()}
              </span>
              <span className="text-green-600 text-sm">
                {getDiscount(price, cuttedPrice)}% off
              </span>
            </>
          )}
        </div>
      </div>

      <button onClick={deleteHandler} className="text-gray-400 hover:text-red-500">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Product;
