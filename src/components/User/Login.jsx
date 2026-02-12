import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Button from "@mui/material/Button";

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
     <main className="bg-[#f3f6fb] px-3 py-6">
  <div className="mx-auto w-full max-w-[960px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

    {/* LEFT – IMAGE */}
    <div className="hidden md:flex items-center justify-center bg-[#f7f9fc]">
      <img
        src="/images/loginimage.webp"
        alt="Login Illustration"
        className="w-[95%] max-w-[300px] object-contain"
      />
    </div>

    {/* RIGHT – FORM */}
<div className="flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-10 mt-6 md:mt-0">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Please login to your account
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <TextField
          fullWidth
          size="small"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        />

        <TextField
          fullWidth
          size="small"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
          }}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="accent-orange-500 w-3.5 h-3.5"
            />
            Remember me
          </label>

          <Link
            to="/password/forgot"
            className="text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

       <div className="relative z-10">
  
</div>
<Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 2,
    py: 1.2,
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: "#f97316",
    "&:hover": {
      backgroundColor: "#ea580c",
    },
  }}
>
  Login
</Button>


      </form>

      <p className="text-xs text-center text-gray-600 mt-5">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-orange-500 font-medium hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  </div>
</main>

    </>
  );
};

export default Login;
