import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  clearErrors,
  deleteOrder,
  getAllOrders
} from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import Actions from './Actions';
import { formatDate } from '../../utils/functions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const OrderTable = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { orders, error } = useSelector((state) => state.allOrders);
  const { loading, isDeleted, error: deleteError } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Deleted Successfully", { variant: "success" });
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 220,
      flex: 1,
    },

    // 🔥 PRODUCT NAME COLUMN (NEW)
    {
      field: "productNames",
      headerName: "Product Name(s)",
      minWidth: 260,
      flex: 1,
      renderCell: (params) => (
        <span className="text-sm text-gray-700 truncate">
          {params.row.productNames}
        </span>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Delivered" ? (
              <span className="text-sm bg-green-100 px-2 py-1 font-medium rounded-full text-green-800">
                {params.row.status}
              </span>
            ) : params.row.status === "Shipped" ? (
              <span className="text-sm bg-yellow-100 px-2 py-1 font-medium rounded-full text-yellow-800">
                {params.row.status}
              </span>
            ) : (
              <span className="text-sm bg-purple-100 px-2 py-1 font-medium rounded-full text-purple-800">
                {params.row.status}
              </span>
            )}
          </>
        );
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 160,
      flex: 0.3,
      renderCell: (params) => (
        <span>₹{params.row.amount.toLocaleString()}</span>
      ),
    },

    {
      field: "orderOn",
      headerName: "Order On",
      minWidth: 180,
      flex: 0.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Actions
          editRoute={"order"}
          deleteHandler={deleteOrderHandler}
          id={params.row.id}
        />
      ),
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((order) => {
      const productNames = order.orderItems.map(item => item.name);

      rows.unshift({
        id: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        orderOn: formatDate(order.createdAt),
        status: order.orderStatus,

        // 🔥 PRODUCT NAMES LOGIC
        productNames:
          productNames.length === 1
            ? productNames[0]
            : `${productNames[0]} + ${productNames.length - 1} more`,
      });
    });

  return (
    <>
      <MetaData title="Admin Orders | Radnus" />

      {loading && <BackdropLoader />}

      <h1 className="text-lg font-medium uppercase mb-3">Orders</h1>

      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 480 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
    </>
  );
};

export default OrderTable;
