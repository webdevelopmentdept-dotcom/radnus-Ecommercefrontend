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
      <main className="
min-h-[calc(100vh-200px)]

  flex
  items-start
  justify-center
  bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300
  px-4
  pt-20
">





        {/* CENTER CARD */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">



          {/* LEFT – ILLUSTRATION */}
          <div
            className="hidden md:block h-full bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/login-illustrationimg.webp')",
            }}
          />

          {/* RIGHT – FORM */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">

              Create your account
            </h2>

            <form
              onSubmit={handleRegister}
              encType="multipart/form-data"
              className="flex flex-col gap-3"
            >
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={name}
                onChange={handleDataChange}
                required
              />

              <TextField
                fullWidth
                label="Email address"
                type="email"
                name="email"
                value={email}
                onChange={handleDataChange}
                required
              />

              {/* GENDER */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Gender:</span>
                <RadioGroup
                  row
                  name="gender"
                  value={gender}
                  onChange={handleDataChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio required />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio required />}
                    label="Female"
                  />
                </RadioGroup>
              </div>

              {/* PASSWORDS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleDataChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="cpassword"
                  value={cpassword}
                  onChange={handleDataChange}
                  required
                />
              </div>

              {/* AVATAR */}
         <div className="flex items-center gap-4 p-3 border rounded-xl bg-gray-50">
  <Avatar
    src={avatarPreview}
    sx={{ width: 56, height: 56 }}
  />

  <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
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


              <button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
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

export default Register;
