import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Button from "@mui/material/Button";



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

    <main className="bg-[#f3f6fb] px-3 py-6">
      <div className="mx-auto w-full max-w-[960px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT – IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-[#f7f9fc]">
          <img
            src="/images/loginimage.webp"
            alt="Update Password"
            className="w-[85%] max-w-[320px] object-contain"
          />
        </div>

        {/* RIGHT – FORM */}
        <div className="flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Update Password
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Change your account password below
          </p>

          <form
            onSubmit={updatePasswordSubmitHandler}
            className="flex flex-col gap-4"
          >
            <TextField
              fullWidth
              size="small"
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            />

            <TextField
              fullWidth
              size="small"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            />

            <TextField
              fullWidth
              size="small"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#f97316",
                "&:hover": { backgroundColor: "#ea580c" },
              }}
            >
              Update Password
            </Button>

            <Link
              to="/account"
              className="text-xs text-center text-gray-600 hover:underline mt-2"
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
