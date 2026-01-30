import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Rating from "@mui/material/Rating";

import {
  clearErrors,
  deleteReview,
  getAllReviews,
} from "../../actions/productAction";

import Actions from "./Actions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

const ReviewsTable = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { reviews, loading, error } = useSelector(
    (state) => state.reviews
  );

  const {
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.review);

  // 🔥 LOAD ALL REVIEWS ON PAGE LOAD
  useEffect(() => {
    dispatch(getAllReviews());

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Review deleted successfully", {
        variant: "success",
      });
      dispatch({ type: DELETE_REVIEW_RESET });
      dispatch(getAllReviews()); // 🔥 refresh list
    }
  }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

  // 🔥 DELETE HANDLER
  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id));
  };

  // 📊 TABLE COLUMNS
  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 220,
      flex: 0.6,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 180,
      flex: 0.4,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.3,
      renderCell: (params) => (
        <Rating
          readOnly
          value={params.row.rating}
          size="small"
          precision={0.5}
        />
      ),
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 300,
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Actions
          deleteHandler={deleteReviewHandler}
          id={params.row.id}
        />
      ),
    },
  ];

  // 📌 ROWS
  const rows =
    reviews?.map((rev) => ({
      id: rev._id,
      rating: rev.rating,
      comment: rev.comment,
      user: rev.user?.name || "User",
    })) || [];

  return (
    <>
      <MetaData title="Admin Reviews | Radnus" />

      {loading && <BackdropLoader />}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium uppercase">
          All Reviews
        </h1>
      </div>

      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 500 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          sx={{
            border: 0,
          }}
        />
      </div>
    </>
  );
};

export default ReviewsTable;
