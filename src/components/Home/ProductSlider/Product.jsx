import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = ({ product }) => {
  const {
    _id,
    name,
    images,
    ratings,
    numOfReviews,
    prices
  } = product;

  // ✅ CUSTOMER PRICE ONLY
const { user } = useSelector((state) => state.user);

// let displayPrice = 0;

// if (user?.role === "dealer") {
//   displayPrice = prices?.dealer;
// } else if (user?.role === "distributor") {
//   displayPrice = prices?.distributor;
// } else {
//   // customer / guest
//   displayPrice = prices?.customer;
// }

let displayPrice = 0;

if (user?.role === "dealer") {
  displayPrice = product?.prices?.dealer || 0;
} else if (user?.role === "distributor") {
  displayPrice = product?.prices?.distributor || 0;
} else {
  displayPrice = product?.prices?.customer || 0;
}


  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const itemInWishlist = wishlistItems.some((i) => i.product === _id);

  const wishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(_id));
      enqueueSnackbar("Removed from Wishlist", { variant: "info" });
    } else {
      dispatch(addToWishlist(_id));
      enqueueSnackbar("Added to Wishlist", { variant: "success" });
    }
  };

  return (
    <div className="product-card">

      {/* WISHLIST */}
      <span
        className={`wishlist ${itemInWishlist ? "active" : ""}`}
        onClick={wishlistHandler}
      >
        <FavoriteIcon sx={{ fontSize: 16 }} />
      </span>

     
     {/* IMAGE */}
<Link to={`/product/${_id}`} className="product-image">
  <img
  src={
    images?.[0]?.url
      ? `${process.env.REACT_APP_BACKEND_URL}${images[0].url}`
      : "/placeholder.png"
  }
  alt={name}
  className="mx-auto"
/>

</Link>

{/* CONTENT */}
<div className="product-body text-center px-2">

  {/* NAME */}
  <h3 className="product-title mt-2 line-clamp-2">
    {name}
  </h3>

  {/* RATING */}
  <div className="rating flex items-center justify-center gap-1 mt-1">
    <span className="rating-badge flex items-center gap-0.5">
      {(ratings || 0).toFixed(1)}
      <StarIcon sx={{ fontSize: 12 }} />
    </span>
    <span className="reviews text-xs text-gray-500">
      ({numOfReviews || 0})
    </span>
  </div>

  {/* PRICE */}
  <div className="price mt-1">
    {displayPrice ? (
  <span className="current font-semibold">
   ₹{displayPrice.toLocaleString()}
  </span>
) : (
  <span className="current text-gray-400 text-sm">
    Price on request
  </span>
 )}
  </div>

</div>


      {/* INTERNAL CSS */}
    <style>{`
/* ================= BASE (DESKTOP DEFAULT) ================= */
.product-card {
  position: relative;
  width: 100%;
  height: 300px;              /* ✅ DESKTOP HEIGHT */
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 14px;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* ===== WISHLIST ===== */
.wishlist {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ccc;
  cursor: pointer;
}

.wishlist.active {
  color: #e53935;
}

/* ===== IMAGE ===== */
.product-image {
  height: 140px;              /* ✅ DESKTOP IMAGE */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

/* ===== BODY ===== */
.product-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 🔥 equal spacing */
  flex-grow: 1;
  margin-top: 6px;
}

/* ===== TITLE ===== */
.product-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  min-height: 36px;           /* ✅ SAME HEIGHT */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== RATING ===== */
.rating {
  min-height: 18px;           /* ✅ SAME HEIGHT */
  font-size: 12px;
  color: #666;
}

.rating-badge {
  background: #2e7d32;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

/* ===== PRICE ===== */
.price {
  font-size: 14px;
  font-weight: 600;
}

/* ================= MOBILE FIX ================= */
@media (max-width: 600px) {
  .product-card {
    height: 250px;            /* ✅ MOBILE COMMON HEIGHT */
    padding: 10px;
  }

  .product-image {
    height: 120px;
  }

  .product-title {
    font-size: 13px;
    min-height: 32px;
  }

  .price {
    font-size: 13px;
  }

  .wishlist {
    top: 6px;
    right: 6px;
  }
}
`}</style>


    </div>
  );
};

export default Product;
