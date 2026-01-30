import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import { submitDeliveredReview } from "../../actions/reviewAction";
import { SUBMIT_REVIEW_RESET } from "../../constants/productConstants";

import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";
import TrackStepper from "./TrackStepper";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { order, loading, error } = useSelector(
    (state) => state.orderDetails
  );

  const { success } = useSelector((state) => state.review);

  const [openReview, setOpenReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewProduct, setReviewProduct] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);


  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [error, dispatch, enqueueSnackbar]);

 const closeReviewModal = () => {
  setShowThankYou(false);
  setOpenReview(false);
  setRating(0);
  setComment("");
  setReviewImages([]);
  setReviewProduct(null);
  dispatch({ type: SUBMIT_REVIEW_RESET });
};


  // 🔥 OPEN REVIEW MODAL
  const openReviewModal = (item) => {
    setReviewProduct({
      productId: item.product._id,
      name: item.name,
      orderId: order._id,
    });

    setRating(0);
    setComment("");
    setOpenReview(true);
  };

  // 🔥 SUBMIT REVIEW
  const submitReviewHandler = () => {
    if (rating === 0 || comment.trim() === "") {
      enqueueSnackbar("Please give rating and comment", {
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();

formData.append("rating", rating);
formData.append("comment", comment);
formData.append("productId", reviewProduct.productId);
formData.append("orderId", reviewProduct.orderId);

// 🔥 add images if any
reviewImages.forEach((img) => {
  formData.append("reviewImages", img);
});

dispatch(submitDeliveredReview(formData));


    setShowThankYou(true);
  };

  const getActiveStep = () => {
    if (order.orderStatus === "Delivered") return 2;
    if (order.orderStatus === "Shipped") return 1;
    return 0;
  };

  return (
    <>
      <MetaData title="Order Details | Radnus" />

      <main className="w-full mt-16 bg-gray-50 min-h-screen">
        {loading ? (
          <Loader />
        ) : (
          order && (
            <div className="max-w-6xl mx-auto px-4 pb-12">
              <h1 className="text-2xl font-semibold mb-6">
                Order Details
              </h1>

              {order.orderItems?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded shadow mb-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain border rounded"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.price}
                      </p>

                      {order.orderStatus === "Delivered" && (
                        <div className="mt-2">
                          <button
                            onClick={() => openReviewModal(item)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Write a Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <TrackStepper
                      orderOn={order.createdAt}
                      shippedAt={order.shippedAt}
                      deliveredAt={order.deliveredAt}
                      activeStep={getActiveStep()}
                    />
                  </div>
                </div>
              ))}

              {openReview && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    {showThankYou ? (
                      <div className="text-center py-8 relative">
                        <CheckCircleIcon
                          className="text-green-600"
                          sx={{ fontSize: 56 }}
                        />
                        <h2 className="mt-3 text-xl font-semibold">
                          Thank you!
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                          Your review has been submitted.
                        </p>
                        <button
  onClick={closeReviewModal}
  className="absolute top-3 right-3 text-gray-400 hover:text-black"
>
  ✕
</button>

                      </div>
                    ) : (
                      <>
                        <h3 className="mb-2 font-medium">
                          Review {reviewProduct?.name}
                        </h3>

                        <div className="flex gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              onClick={() => setRating(star)}
                              className={
                                rating >= star
                                  ? "text-yellow-400 cursor-pointer"
                                  : "text-gray-300 cursor-pointer"
                              }
                            />
                          ))}
                        </div>

                        <textarea
                          rows="4"
                          className="w-full border p-2"
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }
                        />

                        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
  const files = Array.from(e.target.files);
  setReviewImages(files);
}}

/>

{reviewImages.length > 0 && (
  <div className="flex gap-2 mt-2 flex-wrap">
    {reviewImages.map((img, index) => (
      <img
        key={index}
        src={URL.createObjectURL(img)}
        alt="preview"
        className="w-16 h-16 object-cover rounded border"
      />
    ))}
  </div>
)}

                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            onClick={() => setOpenReview(false)}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={submitReviewHandler}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </main>
    </>
  );
};

export default OrderDetails;
