import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";

const Account = () => {
  const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (loading) return <Loader />;

  const firstName = user.name.split(" ")[0];
  const lastName = user.name.split(" ").slice(1).join(" ");



  return (
    <>
      <MetaData title="My Profile | Radnus" />

   <main className="w-full mt-20 sm:mt-16">

  {/* OUTER CONTAINER */}
  <div className="max-w-7xl mx-auto px-4">

    {/* FLEX WRAPPER */}
    <div className="flex flex-col sm:flex-row gap-6 items-start">

      {/* SIDEBAR */}
     <div className="w-full sm:w-1/4 sm:sticky sm:top-24 self-start">

  {/* MOBILE PROFILE HEADER */}
  <div
    className="sm:hidden bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer"
    onClick={() => setShowMenu(!showMenu)}
  >
    <div className="flex items-center gap-3">
      <img
        src={user?.avatar?.url}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="text-xs text-gray-500">Hello,</p>
        <p className="font-medium text-gray-800">{user?.name}</p>
      </div>
    </div>

    <span className="text-lg">{showMenu ? "▲" : "▼"}</span>
  </div>

  {/* MOBILE SIDEBAR MENU */}
 {showMenu && (
  <div className="mt-2 sm:hidden">
    <Sidebar activeTab="profile" showProfileCard={false} />
  </div>
)}


  {/* DESKTOP SIDEBAR */}
  <div className="hidden sm:block">
    <Sidebar activeTab="profile" />
  </div>

</div>

          {/* CONTENT */}
       <div className="w-full sm:max-w-4xl bg-white rounded-lg shadow p-6">


            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-semibold text-gray-800">
                My Profile
              </h1>

              <Link
                to="/account/update"
                className="text-sm text-red-600 font-medium hover:underline"
              >
                Edit Profile
              </Link>
            </div>

            {/* PERSONAL INFO */}
            <section className="mb-8">
              <h2 className="text-sm font-medium text-gray-700 mb-3">
                Personal Information
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <InputBox label="First Name" value={firstName} />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">
                  Gender
                </p>

                <div className="flex gap-6 text-sm text-gray-600">
                  <span>
                    <input
                      type="radio"
                      checked={user.gender === "male"}
                      disabled
                      className="mr-1"
                    />
                    Male
                  </span>

                  <span>
                    <input
                      type="radio"
                      checked={user.gender === "female"}
                      disabled
                      className="mr-1"
                    />
                    Female
                  </span>
                </div>
              </div>
            </section>

            {/* EMAIL INFO */}
            <section className="mb-8">
              <h2 className="text-sm font-medium text-gray-700 mb-3">
                Email Information
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-4">

                <InputBox
                  label="Email Address"
                  value={user.email}
                />

                <Link
                  to="/password/update"
                  className="text-sm text-red-600 font-medium hover:underline mt-2 sm:mt-6"
                >
                  Change Password
                </Link>

              </div>
            </section>

            {/* DEACTIVATE */}
            <div className="border-t pt-6">
              <Link
                to="/"
                className="text-sm text-red-600 font-medium hover:underline"
              >
                Deactivate Account
              </Link>
            </div>

          </div>
        </div>
        </div>
      </main>
    </>
  );
};

const InputBox = ({ label, value }) => (
  <div className="flex flex-col w-full sm:w-64 bg-gray-100 px-3 py-2 rounded border">


    <label className="text-xs text-gray-500">
      {label}
    </label>

    <input
      type="text"
      value={value}
      disabled
      className="bg-transparent outline-none text-sm text-gray-700"
    />

  </div>
);

export default Account;
