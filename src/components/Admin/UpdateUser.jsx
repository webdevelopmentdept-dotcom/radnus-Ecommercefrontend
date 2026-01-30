import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction';
import { UPDATE_USER_RESET, REMOVE_USER_DETAILS } from '../../constants/userConstants';
import Loading from './Loading';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state.userDetails);
  const { isUpdated, error: updateError, loading: updateLoading } =
    useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  // ✅ SUBMIT HANDLER (JSON ONLY)
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(userId, {
        name,
        email,
        gender,
        role,
      })
    );
  };

  useEffect(() => {
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setRole(user.role); // 🔥 THIS WILL NOW WORK
      setAvatarPreview(user.avatar?.url || "");
    }

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (updateError) {
      enqueueSnackbar(updateError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("User Updated Successfully", { variant: "success" });
      dispatch({ type: UPDATE_USER_RESET });
      dispatch({ type: REMOVE_USER_DETAILS });
      navigate("/admin/users");
    }
  }, [
    dispatch,
    user,
    userId,
    error,
    updateError,
    isUpdated,
    navigate,
    enqueueSnackbar,
  ]);

  return (
    <>
      <MetaData title="Admin: Update User | Radnus" />
      {updateLoading && <BackdropLoader />}

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
          <h2 className="text-center text-2xl font-medium mt-6">
            Update Profile
          </h2>

          <form onSubmit={updateUserSubmitHandler} className="p-5 sm:p-10">
            <div className="flex flex-col gap-4">

              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div>
                <h2>Your Gender :</h2>
                <RadioGroup row>
                  <FormControlLabel
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </div>

              <div className="flex items-center gap-3">
                <Avatar src={avatarPreview} />
                <TextField
                  label="Role"
                  select
                  fullWidth
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <MenuItem value="normal">Customer</MenuItem>
                  <MenuItem value="dealer">Dealer</MenuItem>
                  <MenuItem value="distributor">Distributor</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </div>

              <button className="bg-primary-orange text-white py-3 rounded">
                Update
              </button>

              <Link
                to="/admin/users"
                className="text-center border py-3 rounded"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
