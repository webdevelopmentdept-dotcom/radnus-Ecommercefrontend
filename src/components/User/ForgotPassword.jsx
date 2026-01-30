import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";

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
          <div className="p-8 sm:p-10 flex flex-col justify-center">

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Forgot your password?
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Enter your registered email and we’ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
              >
                Send Reset Link
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
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
