import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Dashboard from "./Dashboard";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);
  const { isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Load User
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatarPreview(
        user?.avatar?.url
          ? `http://localhost:5000${user.avatar.url}`
          : ""
      );
    }
  }, [user]);

  // Avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Save
  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  // Success / Error
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("Profile updated successfully", {
        variant: "success",
      });
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, isUpdated, enqueueSnackbar]);

  return (
    <Dashboard activeTab={-1}>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-10">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Account Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account information & security
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT – PROFILE CARD */}
          <div className="border rounded-lg p-6 text-center">
            <img
              src={avatarPreview}
              alt="admin"
              className="w-28 h-28 mx-auto rounded-full object-cover border"
            />

            <label className="mt-4 inline-block text-sm text-blue-600 cursor-pointer">
              Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>

            <h3 className="mt-4 font-semibold text-lg">
              {user?.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {user?.email}
            </p>

            <span className="inline-block mt-2 px-4 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          {/* RIGHT – FORM */}
          <div className="md:col-span-2 border rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            {/* Security */}
            <div className="mt-12">
  <div className="flex items-center justify-between">
    <div>
      <h4 className="text-sm font-semibold text-gray-800">
        Account Security
      </h4>
      <p className="text-sm text-gray-500 mt-1 max-w-md">
        You can change your password anytime to keep your account secure.
      </p>
    </div>

    <Link
      to="/password/update"
      className="text-sm font-medium text-blue-600 hover:text-blue-700"
    >
      Change Password →
    </Link>
  </div>
</div>


          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 shadow"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default AdminProfile;
