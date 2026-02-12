import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import Button from "@mui/material/Button";


const ResetPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
      return;
    }
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Doesn't Match", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.set("password", newPassword);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, formData));
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Password Updated Successfully", { variant: "success" });
      navigate("/login")
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Password Reset | Radnus" />

      {loading && <BackdropLoader />}
      <main className="bg-[#f3f6fb] px-3 py-6">
  <div className="mx-auto w-full max-w-[960px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

    {/* LEFT – IMAGE */}
    <div className="hidden md:flex items-center justify-center bg-[#f7f9fc]">
      <img
        src="/images/loginimage.webp"
        alt="Reset Password"
        className="w-[85%] max-w-[320px] object-contain"
      />
    </div>

    {/* RIGHT – FORM */}
    <div className="flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Reset Password
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Enter your new password below
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      </form>

      <p className="text-xs text-center text-gray-600 mt-5">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="text-orange-500 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  </div>
</main>

    </>
  );
};

export default ResetPassword;
