import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Button from "@mui/material/Button";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      enqueueSnackbar("Please enter email", { variant: "warning" });
      return;
    }

    dispatch(forgotPassword({ email }));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (message) {
      enqueueSnackbar(message, { variant: "success" });
    }
  }, [dispatch, error, message, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Forgot Password | Radnus" />
      {loading && <BackdropLoader />}

      {/* FULL PAGE BACKGROUND */}
   <main className="bg-[#f3f6fb] px-3 py-6">
  <div className="mx-auto w-full max-w-[960px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

    {/* LEFT – IMAGE */}
    <div className="hidden md:flex items-center justify-center bg-[#f7f9fc]">
      <img
        src="/images/loginimage.webp"
        alt="Forgot Password"
        className="w-[85%] max-w-[320px] object-contain"
      />
    </div>

    {/* RIGHT – FORM */}
    <div className="flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Forgot Password
      </h2>

      <p className="text-sm text-gray-500 mt-1 mb-6">
        Enter your registered email and we’ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          fullWidth
          size="small"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Send Reset Link
        </Button>
      </form>

      <p className="text-xs text-center text-gray-600 mt-5">
        Remember your password?{" "}
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

export default ForgotPassword;
