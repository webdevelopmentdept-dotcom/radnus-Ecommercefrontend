import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import { removeFromSaveForLater } from "../../actions/saveForLaterAction";
import { getDiscount } from "../../utils/functions";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";

const SaveForLaterItem = ({
  product,
  name,
  seller,
  price,
  cuttedPrice,
  image,
  stock,
  quantity,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // ⭐ RATING STATE (OPTION 1)
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const removeFromSaveForLaterHandler = (id) => {
    dispatch(removeFromSaveForLater(id));
    enqueueSnackbar("Removed From Save For Later", { variant: "success" });
  };

  const moveToCartHandler = (id, quantity) => {
    dispatch(addItemsToCart(id, quantity));
    removeFromSaveForLaterHandler(id);
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  // ⭐ FETCH REVIEWS (SAME AS WISHLIST – OPTION 1)
  useEffect(() => {
    if (!product) return;

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?productId=${product}`
    )
      .then((res) => res.json())
      .then((data) => {
        const reviews = data.reviews || [];

        if (reviews.length === 0) {
          setAvgRating(0);
          setReviewCount(0);
          return;
        }

        const avg =
          reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.length;

        setAvgRating(avg.toFixed(1));
        setReviewCount(reviews.length);
      })
      .catch(() => {});
  }, [product]);

  return (
    <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b" key={product}>
      <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full">
          {/* IMAGE */}
<div className="w-full sm:w-1/6 h-28 flex-shrink-0">
  <img
    draggable="false"
    className="h-full w-full object-contain"
    src={
      image?.startsWith("http")
        ? image
        : `${process.env.REACT_APP_BACKEND_URL}${image}`
    }
    alt={name}
  />
</div>
        {/* DETAILS */}
        <div className="flex flex-col gap-1 sm:gap-5 w-full p-1 pr-6">
          <div className="flex justify-between items-start pr-5">
            <div className="flex flex-col gap-0.5 w-11/12 sm:w-full">
              <p>
                {name.length > 50
                  ? `${name.substring(0, 50)}...`
                  : name}
              </p>
              <span className="text-sm text-gray-500">
                Seller : Radnus {seller}
              </span>

              {/* ⭐ RATING */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span className="bg-green-600 text-white px-1 flex items-center gap-1">
                  {avgRating}
                  <StarIcon sx={{ fontSize: 14 }} />
                </span>
                <span>({reviewCount})</span>
              </div>
            </div>
          </div>

          {/* PRICE */}
          <div className="flex items-baseline gap-2 text-xl font-medium">
            <span>₹{(price * quantity).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-evenly sm:justify-start sm:gap-6">
       

        <button
          onClick={() => moveToCartHandler(product, quantity)}
          className="sm:ml-4 font-medium hover:text-primary-blue"
        >
          MOVE TO CART
        </button>

        <button
          onClick={() => removeFromSaveForLaterHandler(product)}
          className="font-medium hover:text-red-600"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default SaveForLaterItem;
