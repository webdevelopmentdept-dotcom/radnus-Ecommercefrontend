import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  clearErrors,
  getProductDetails,
  getSimilarProducts,
} from "../../actions/productAction";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { addItemsToCart } from "../../actions/cartAction";
import { getDeliveryDate } from "../../utils/functions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import MetaData from "../Layouts/MetaData";


const PreviousBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      left: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 30,
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    ❮
  </button>
);

const NextBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 30,
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    ❯
  </button>
);

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  // reviews toggle
  const [viewAll, setViewAll] = useState(false);
  const [reviews, setReviews] = useState([]);
const [zoomImage, setZoomImage] = useState(null);



  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };
  const { user } = useSelector((state) => state.user);
  const userRole = user?.role;

  // const role = user?.role || "customer";

  // let displayPrice = product?.prices?.customer ?? 0;

  // if (role === "dealer") displayPrice = product?.prices?.dealer ?? 0;
  // else if (role === "distributor")
  //   displayPrice = product?.prices?.distributor ?? 0;

  const productId = params.id;
  const itemInWishlist = wishlistItems.some((i) => i.product === productId);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(productId));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(productId));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };



  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const itemInCart = cartItems.some((i) => i.product === productId);

  const goToCart = () => {
    navigate("/cart");
  };

  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
  };

 
useEffect(() => {
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
    dispatch(clearErrors());
  }

 

  dispatch(getProductDetails(productId));
}, [dispatch, productId, error, enqueueSnackbar]);

useEffect(() => {
 fetch(
  `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?productId=${productId}`
)
  .then(res => res.json())
  .then(data => setReviews(data.reviews || []))
  .catch(() => {});
}, [productId]);



useEffect(() => {
  if (product?.category) {
    dispatch(getSimilarProducts(product.category));
  }
}, [dispatch, product?.category]);

let displayPrice = product?.price ?? 0;



const avgRating =
  reviews.length === 0
    ? 0
    : (
        reviews.reduce((acc, r) => acc + r.rating, 0) /
        reviews.length
      ).toFixed(1);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData
  title={`${product?.name} | Buy Online at Best Price | Radnus`}
  description={
    product?.description
      ? product.description.substring(0, 150)
      : "Buy genuine mobile accessories at Radnus"
  }
  keywords={`${product?.name}, ${product?.brand?.name}, mobile accessories`}
image={product?.images?.[0]?.url}

  url={`https://radnusone.com/product/${product?._id}`}
  robots="index, follow"
/>

      <main className="w-full pt-[64px] sm:pt-0">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky sm:top-[140px] sm:h-screen">

                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                        <div className="w-full h-auto sm:h-[420px] pb-6 border relative">
           <Slider {...settings} key={product.images?.length}>
  {product.images &&
    product.images.map((item, i) => (
      <img
        key={i}
        draggable="false"
        className="w-full h-full object-contain"
       src={item.url}

        alt={product.name}
      />
    ))}
</Slider>
                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                      <span
                        onClick={addToWishlistHandler}
                        className={`${
                          itemInWishlist
                            ? "text-red-500"
                            : "hover:text-red-500 text-gray-300"
                        } cursor-pointer`}
                      >
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    {/* ================= PREMIUM ACTION BAR ================= */}
<div className="w-full mt-6">

  <div className="flex flex-col sm:flex-row gap-4">

    {/* BUY NOW – PRIMARY */}
    <button
      onClick={buyNow}
      disabled={product.stock < 1}
      className={`
        w-full sm:flex-1
        h-16
        rounded-xl
        flex items-center justify-center gap-3
        text-base
        font-semibold
        transition-all
        duration-200
        ${
          product.stock < 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : `
              bg-gradient-to-r from-black to-gray-900
              text-white
              shadow-lg
              hover:shadow-xl
              hover:from-gray-900 hover:to-black
              active:scale-[0.98]
            `
        }
      `}
    >
      <FlashOnIcon sx={{ fontSize: 22 }} />
      {product.stock < 1 ? "Out of Stock" : "Buy Now"}
    </button>

    {/* ADD TO CART – SECONDARY */}
    {product.stock > 0 && (
      <button
        onClick={itemInCart ? goToCart : addToCartHandler}
        className="
          w-full sm:flex-1
          h-16
          rounded-xl
          flex items-center justify-center gap-3
          text-base
          font-medium
          border border-gray-300
          bg-white
          text-gray-900
          hover:bg-gray-50
          transition-all
          duration-200
          active:scale-[0.98]
        "
      >
        <ShoppingCartIcon sx={{ fontSize: 22 }} />
        {itemInCart ? "View Cart" : "Add to Cart"}
      </button>
    )}

  </div>

  {/* TRUST TEXT */}
  <p className="mt-3 text-xs text-center text-gray-500">
    100% Genuine Products • Secure Payments • Easy Returns
  </p>

</div>

                  </div>
                </div>
                {/* <!-- imgbox --> */}
              </div>
              {/* <!-- image wrapper --> */}

            {/* ================= PRODUCT DESC WRAPPER ================= */}
<div className="flex-1 px-4 sm:px-8 py-4 space-y-8 bg-[#fafafa]">

  {/* ================= HEADER ================= */}
  <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
    <h2 className="text-2xl font-semibold text-gray-900">
      {product.name}
    </h2>
    {/* ⭐ STAR RATING */}
    <div className="flex items-center gap-3">
  <span className="text-sm font-semibold text-gray-800">
    {avgRating}
  </span>

 <Rating
  value={Number(avgRating)}
  precision={0.5}
  readOnly
/>

    

  <span className="text-sm text-gray-500">
   {reviews.length} reviews

  </span>
</div>
    {/* PRICE */}
    <div className="pt-3">
      <p className="text-xs uppercase tracking-wide text-emerald-600 font-medium">
  {userRole === "dealer"
    ? "Dealer Price"
    : userRole === "distributor"
    ? "Distributor Price"
    : "Customer Price"}
</p>

      <p className="text-4xl font-bold text-gray-900">
  ₹{displayPrice?.toLocaleString()}
</p>


      {product.stock <= 10 && product.stock > 0 && (
        <p className="mt-1 text-sm text-red-600">
          Limited stock • Only {product.stock} left
        </p>
      )}
    </div>
  </div>

  {/* ================= META ================= */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
   <img
  src={product?.brand?.logo?.url || "/placeholder.png"}
  alt={product?.brand?.name || "Brand"}
  className="w-14 h-14 object-contain"
/>

      <div>
        <p className="text-sm text-gray-500">Brand</p>
        <p className="font-medium">{product.brand?.name}</p>
      </div>
    </div>

    <div className="bg-white rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">Delivery</p>
      <p className="font-medium">
        Delivered by {getDeliveryDate()}
      </p>
    </div>
  </div>

  {/* ================= HIGHLIGHTS ================= */}
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="font-semibold text-lg mb-4">Key Highlights</h3>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      {product.highlights?.map((h, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-emerald-600">•</span>
          {h}
        </li>
      ))}
    </ul>
  </div>

  {/* ================= DESCRIPTION ================= */}
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="font-semibold text-lg mb-3">Product Description</h3>
    <p className="text-sm leading-relaxed text-gray-700">
      {product.description}
    </p>
  </div>

  {/* ================= SPECIFICATIONS ================= */}
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="font-semibold text-lg mb-4">Specifications</h3>

    <div className="divide-y">
      {product.specifications?.map((spec, i) => (
        <div key={i} className="flex py-2 text-sm">
          <span className="w-1/3 text-gray-500">{spec.title}</span>
          <span className="flex-1 font-medium">{spec.description}</span>
        </div>
      ))}
    </div>
  </div>

    {/* ================= REVIEWS ================= */}
<div className="w-full mt-4 rounded-sm border flex flex-col">
  <div className="flex justify-between items-center border-b px-6 py-4">
    <h1 className="text-2xl font-medium">
      Ratings & Reviews
    </h1>
  </div>

  {/* ⭐ RATING SUMMARY */}
  <div className="flex items-center border-b px-6 py-4">
    <h1 className="text-3xl font-semibold">
   {avgRating}
      <StarIcon />
    </h1>
    <p className="ml-2 text-lg text-gray-500">
  ({reviews.length}) Reviews
    </p>
  </div>

  {/* 📝 NO REVIEWS STATE */}
  {reviews.length === 0 && (
    <div className="py-8 text-center text-gray-500">
      No reviews yet. Be the first to review this product.
    </div>
  )}

  {/* 📝 REVIEWS LIST */}
  {(viewAll
    ?reviews
    : reviews?.slice(-3)
  )
    ?.slice()
    .reverse()
    .map((rev) => (
      <div
        className="flex flex-col gap-2 py-4 px-6 border-b"
        key={rev._id}
      >
        <Rating
          value={rev.rating}
          readOnly
          size="small"
          precision={0.5}
        />
        <p className="text-sm">{rev.comment}</p>

        {/* 🔥 REVIEW IMAGES */}
{rev.images && rev.images.length > 0 && (
  <div className="flex gap-2 mt-2 flex-wrap">
    {rev.images.map((img, idx) => (
      <img
        key={idx}
       src={img.url}

        alt="review"
        onClick={() =>
          setZoomImage(
            `${process.env.REACT_APP_BACKEND_URL}${img.url}`
          )
        }
        className="w-20 h-20 object-cover rounded cursor-pointer border"
      />
    ))}
  </div>
)}




<span className="text-xs text-gray-500">
  by {rev.user?.name || "Verified Buyer"}
</span>
      </div>
    ))}

  {/* VIEW ALL / LESS */}
  {reviews.length > 3 && (
    <button
      onClick={() => setViewAll(!viewAll)}
      className="w-40 m-3 self-center rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
    >
      {viewAll ? "View Less" : "View All"}
    </button>
  )}
</div>




</div>
{/* ================= END PRODUCT DESC WRAPPER ================= */}

            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            <div className="flex flex-col gap-3 mt-6">
              <ProductSlider
                title={"Similar Products"}
                tagline={"Based on the category"}
              />
            </div>
            {zoomImage && (
  <div
    className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center"
    onClick={() => setZoomImage(null)}
  >
    <div
      className="relative max-w-3xl w-full mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ❌ CLOSE BUTTON */}
      <button
        onClick={() => setZoomImage(null)}
        className="absolute -top-10 right-0 text-white text-3xl font-bold"
      >
        ✕
      </button>

      {/* ZOOM IMAGE */}
      <img
        src={zoomImage}
        alt="Zoom Review"
        className="w-full max-h-[90vh] object-contain rounded-lg"
      />
    </div>
  </div>
)}

          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;