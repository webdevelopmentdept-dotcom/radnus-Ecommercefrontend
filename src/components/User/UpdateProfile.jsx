import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Button from "@mui/material/Button";


const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("gender", gender);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const handleUpdateDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("Profile Updated Successfully", {
        variant: "success",
      });
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

 return (
  <>
    <MetaData title="Update Profile | Radnus" />
    {loading && <BackdropLoader />}

    <main className="bg-[#f3f6fb] px-3 py-6">
      <div className="mx-auto w-full max-w-[960px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT – IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-[#f7f9fc]">
          <img
            src="/images/loginimage.webp"
            alt="Update Profile"
            className="w-[85%] max-w-[320px] object-contain"
          />
        </div>

        {/* RIGHT – FORM */}
        <div className="flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Update Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-6">
            Edit your personal information below
          </p>

          <form
            onSubmit={updateProfileHandler}
            encType="multipart/form-data"
            className="flex flex-col gap-4"
          >
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            />

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

            {/* GENDER */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-700">Gender:</span>
              <RadioGroup row>
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </div>

            {/* AVATAR */}
            <div className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50">
              <Avatar src={avatarPreview} sx={{ width: 48, height: 48 }} />
              <label className="cursor-pointer text-xs font-medium text-orange-600 hover:underline">
                Change profile photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUpdateDataChange}
                />
              </label>
            </div>

            {/* UPDATE BUTTON */}
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
              Update Profile
            </Button>

            <Link
              to="/account"
              className="text-xs text-center text-gray-600 hover:underline mt-2"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </main>
  </>
);

};

export default UpdateProfile;
