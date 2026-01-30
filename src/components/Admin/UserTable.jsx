import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Actions from "./Actions";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

const UserTable = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { users, error } = useSelector((state) => state.users);
  const { loading, isDeleted, error: deleteError } = useSelector(
    (state) => state.profile
  );

  // 🔄 FETCH USERS
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
      enqueueSnackbar("User Deleted Successfully", {
        variant: "success",
      });
      dispatch({ type: DELETE_USER_RESET });
    }

    // 🔥 ALWAYS refetch users (role update, delete, page load)
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  // 📊 TABLE COLUMNS
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <img
              draggable="false"
              src={params.row.avatar}
              alt={params.row.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {params.row.name}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      flex: 0.2,
      renderCell: (params) => {
  const role = params.row.role.toLowerCase();

  let badgeClass = "bg-purple-100 text-purple-800";

  if (role === "admin")
    badgeClass = "bg-green-100 text-green-800";
  else if (role === "dealer")
    badgeClass = "bg-blue-100 text-blue-800";
else if (role === "distributor")
  badgeClass = "bg-primary-orange text-white";

  return (
    <span
      className={`text-sm px-2 py-1 font-medium rounded-full capitalize ${badgeClass}`}
    >
      {params.row.role}
    </span>
  );
},

    },
    {
      field: "registeredOn",
      headerName: "Registered On",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Actions
          editRoute="user"
          deleteHandler={deleteUserHandler}
          id={params.row.id}
          name={params.row.name}
        />
      ),
    },
  ];

  // 📦 ROW DATA
  const rows = [];

  users &&
    users.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        avatar: item.avatar?.url || "/placeholder.png",
        email: item.email,
        gender: item.gender.toUpperCase(),
        role: item.role,
        registeredOn: new Date(item.createdAt)
          .toISOString()
          .substring(0, 10),
      });
    });

  return (
    <>
      <MetaData title="Admin Users | Radnus" />

      {loading && <BackdropLoader />}

      <h1 className="text-lg font-medium uppercase mb-3">
        Users
      </h1>

      <div
        className="bg-white rounded-xl shadow-lg w-full"
        style={{ height: 470 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectIconOnClick
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
    </>
  );
};

export default UserTable;
