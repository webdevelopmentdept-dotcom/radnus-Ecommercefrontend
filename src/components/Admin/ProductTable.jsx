import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../actions/productAction";

import Rating from "@mui/material/Rating";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

import Actions from "./Actions";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { products = [], error } = useSelector(
    (state) => state.products
  );

  const {
    loading,
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.product);

  // 🔥 LOAD PRODUCTS + HANDLE ERRORS
  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Product Deleted Successfully", {
        variant: "success",
      });
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProducts()); // 🔥 reload after delete
    }
  }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

  // 🔥 DELETE HANDLER
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // 🔥 TABLE COLUMNS
  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img
            src={params.row.image}
            alt={params.row.name}
            className="w-10 h-10 rounded object-cover"
          />
          <span>{params.row.name}</span>
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 130,
      flex: 0.4,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 120,
      flex: 0.3,
      renderCell: (params) =>
        params.row.stock < 10 ? (
          <span className="bg-red-200 text-red-700 px-2 py-1 rounded">
            {params.row.stock}
          </span>
        ) : (
          <span>{params.row.stock}</span>
        ),
    },
    {
      field: "customerPrice",
      headerName: "Customer Price",
      minWidth: 150,
      renderCell: (params) =>
        <span>₹{params.value.toLocaleString()}</span>,
    },
    {
      field: "dealerPrice",
      headerName: "Dealer Price",
      minWidth: 150,
      renderCell: (params) =>
        <span>₹{params.value.toLocaleString()}</span>,
    },
    {
      field: "distributorPrice",
      headerName: "Distributor Price",
      minWidth: 170,
      renderCell: (params) =>
        <span>₹{params.value.toLocaleString()}</span>,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 140,
      flex: 0.4,
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
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Actions
          editRoute="product"
          deleteHandler={deleteProductHandler}
          id={params.row.id}
        />
      ),
    },
  ];

  // 🔥 ROWS
  const rows = products.map((item) => ({
    id: item._id,
    name: item.name,
    image: item.images?.[0]?.url || "/placeholder.png",
    category: item.category,
    stock: item.stock || 0,
    customerPrice: item.prices?.customer || 0,
    dealerPrice: item.prices?.dealer || 0,
    distributorPrice: item.prices?.distributor || 0,
    rating: item.ratings || 0,
  }));

  return (
    <>
      <MetaData title="Admin Products | Radnus" />

      {loading && <BackdropLoader />}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium uppercase">
          Products
        </h1>
        <Link
          to="/admin/new_product"
          className="px-4 py-2 bg-primary-blue text-white rounded shadow"
        >
          New Product
        </Link>
      </div>

      <div className="bg-white rounded shadow" style={{ height: 520 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default ProductTable;
