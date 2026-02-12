import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../../actions/userAction";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Button from "@mui/material/Button";


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const { name, email, gender, password, cpassword } = user;

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("preview.png");

  // ================= SUBMIT =================
  const handleRegister = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", {
        variant: "warning",
      });
      return;
    }

    if (password !== cpassword) {
      enqueueSnackbar("Password doesn't match", { variant: "error" });
      return;
    }

    if (!avatar) {
      enqueueSnackbar("Select Avatar", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("password", password);
    formData.append("avatar", avatar);

    dispatch(registerUser(formData));
  };

  // ================= INPUT CHANGE =================
  const handleDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (!file) return;

      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Register | Radnus" />
      {loading && <BackdropLoader />}

      {/* FULL PAGE BACKGROUND */}
     <main className="bg-[#f3f6fb] px-3 pt-16 pb-8 md:py-6 min-h-[100svh] flex md:block items-center">
  <div className="mx-auto w-full max-w-[960px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

    {/* LEFT – IMAGE */}
    <div className="hidden md:flex items-center justify-center bg-[#f7f9fc]">
      <img
        src="/images/loginimage.webp"
        alt="Register Illustration"
        className="w-[85%] max-w-[390px] object-contain"
      />
    </div>

    {/* RIGHT – FORM */}
    <div className="flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Create Account
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Please fill the details to register
      </p>

      <form
        onSubmit={handleRegister}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <TextField
          fullWidth
          size="small"
          label="Full Name"
          name="name"
          value={name}
          onChange={handleDataChange}
          required
          sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
        />

        <TextField
          fullWidth
          size="small"
          label="Email address"
          type="email"
          name="email"
          value={email}
          onChange={handleDataChange}
          required
          sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
        />

        {/* GENDER */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-700">Gender:</span>
          <RadioGroup
            row
            name="gender"
            value={gender}
            onChange={handleDataChange}
          >
            <FormControlLabel
              value="male"
              control={<Radio size="small" required />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio size="small" required />}
              label="Female"
            />
          </RadioGroup>
        </div>

        {/* PASSWORDS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <TextField
            fullWidth
            size="small"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleDataChange}
            required
            sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
          />
          <TextField
            fullWidth
            size="small"
            label="Confirm Password"
            type="password"
            name="cpassword"
            value={cpassword}
            onChange={handleDataChange}
            required
            sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
          />
        </div>

        {/* AVATAR */}
        <div className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50">
          <Avatar src={avatarPreview} sx={{ width: 48, height: 48 }} />
          <label className="cursor-pointer text-xs font-medium text-orange-600 hover:underline">
            Upload profile photo
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleDataChange}
              className="hidden"
            />
          </label>
        </div>

        {/* REGISTER BUTTON */}
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
          Create Account
        </Button>
      </form>

      <p className="text-xs text-center text-gray-600 mt-5">
        Already have an account?{" "}
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

export default Register;
