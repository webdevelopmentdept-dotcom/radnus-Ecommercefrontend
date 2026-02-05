import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../actions/wishlistAction";
import { useEffect, useState } from "react";

const Product = ({ item }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const productData = item.productData || item;

  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const userRole = user?.role;

  let displayPrice =
    userRole === "dealer"
      ? productData?.prices?.dealer
      : userRole === "distributor"
      ? productData?.prices?.distributor
      : productData?.price;

  const imageUrl =
    productData?.images?.[0]?.url
      ? `${process.env.REACT_APP_BACKEND_URL}${productData.images[0].url}`
      : productData?.image
      ? `${process.env.REACT_APP_BACKEND_URL}${productData.image}`
      : "/placeholder.png";

  const deleteHandler = () => {
    dispatch(removeFromWishlist(productData?._id || item.product));
  };

  // ⭐ FETCH REVIEWS
  useEffect(() => {

    if (!productData) return;

    const id = productData._id || item.product;

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?productId=${id}`
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
  }, [productData, item.product]);

  // ⭐ RETURN CHECK MUST BE AFTER HOOKS
  if (!productData) return null;

  return (
    <div className="flex gap-4 border-b p-4 w-full">

      <img
        src={imageUrl}
        alt={productData.name}
        className="w-24 h-24 object-contain"
      />

      <div className="flex flex-col gap-2 flex-1">

        <Link to={`/product/${productData._id || item.product}`}>
          <p className="font-medium hover:text-primary-blue">
            {productData.name}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span className="bg-green-600 text-white px-1 flex items-center gap-1">
              {avgRating}
              <StarIcon sx={{ fontSize: 14 }} />
            </span>

            <span>({reviewCount})</span>
          </div>
        </Link>

        <div className="mt-2">
          <span className="text-xl font-semibold">
            ₹{displayPrice?.toLocaleString() || "0"}
          </span>
        </div>

      </div>

      <button
        onClick={deleteHandler}
        className="text-gray-400 hover:text-red-500"
      >
        <DeleteIcon />
      </button>

    </div>
  );
};

export default Product;
