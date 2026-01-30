import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isAuthenticated && user) {
      navigate(user.role === "admin" ? "/admin/dashboard" : "/account");
    }
  }, [dispatch, error, isAuthenticated, user, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Login | Radnus" />
      {loading && <BackdropLoader />}

      {/* FULL PAGE BACKGROUND */}
     <main className="min-h-screen flex justify-center md:items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4 pt-24 md:pt-0">
        {/* CENTER CARD */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* LEFT – ILLUSTRATION */}
         <div
  className="hidden md:block h-full bg-no-repeat bg-center bg-cover"
  style={{
    backgroundImage: "url('/images/login-illustrationimg.webp')",
  }}
></div>


          {/* RIGHT – FORM */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Sign in to your account
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex justify-end">
                <Link
                  to="/password/forgot"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>

        </div>
      </main>
    </>
  );
};

export default Login;
