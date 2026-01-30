import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ================= SUBMIT =================
  const updatePasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", {
        variant: "warning",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Doesn't Match", { variant: "error" });
      return;
    }

    // ✅ SEND JSON (NOT FormData)
    dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
    );
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("Password Updated Successfully", {
        variant: "success",
      });
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);
return (
  <>
    <MetaData title="Password Update | Radnus" />
    {loading && <BackdropLoader />}

    {/* FULL PAGE BACKGROUND */}
    <main className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4 py-10">

      {/* CENTER CARD */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT – ILLUSTRATION */}
        <div
          className="hidden md:block bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/login-illustrationimg.webp')",
          }}
        />

        {/* RIGHT – FORM */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Update Password
          </h2>

          <form
            onSubmit={updatePasswordSubmitHandler}
            className="flex flex-col gap-4"
          >
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
            >
              Update Password
            </button>

            <Link
              to="/account"
              className="text-sm text-center text-gray-600 hover:underline mt-2"
            >
              Cancel and go back
            </Link>
          </form>

        </div>
      </div>
    </main>
  </>
);

};

export default UpdatePassword;
