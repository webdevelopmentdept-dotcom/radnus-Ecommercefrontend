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

      {/* FULL PAGE BACKGROUND */}
     <main className="py-8 flex justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">


        {/* CENTER CARD */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 my-4">

          
          {/* LEFT – ILLUSTRATION */}
          <div
         className="hidden md:block min-h-[420px] bg-no-repeat bg-center bg-cover"

            style={{
              backgroundImage:
                "url('/images/login-illustrationimg.webp')",
            }}
          ></div>

          {/* RIGHT – FORM */}
          <div className="p-6 sm:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Update your profile
            </h2>

            <form
              onSubmit={updateProfileHandler}
              encType="multipart/form-data"
              className="flex flex-col gap-4"
            >
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* GENDER */}
              <div className="flex items-center gap-6">
                <span className="text-gray-700 font-medium">
                  Gender
                </span>
                <RadioGroup row>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    checked={gender === "male"}
                    onChange={(e) =>
                      setGender(e.target.value)
                    }
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    checked={gender === "female"}
                    onChange={(e) =>
                      setGender(e.target.value)
                    }
                  />
                </RadioGroup>
              </div>

              {/* AVATAR */}
              <div className="flex items-center gap-4">
                <Avatar
                  src={avatarPreview}
                  sx={{ width: 56, height: 56 }}
                />
                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleUpdateDataChange}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
              >
                Update Profile
              </button>

              <Link
                to="/account"
                className="text-center text-blue-600 font-medium hover:underline"
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
