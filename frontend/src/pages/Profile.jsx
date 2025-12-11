import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import api from "../axiosInstance";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userdata, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [oldpasswd, setOldPasswd] = useState("");
  const [newpasswd, setNewPasswd] = useState("");
  const [cpasswd, setCPasswd] = useState("");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  if (!userdata) return;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/me/profile");
        setUserData(res.data.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await api.put("/user/me/update", {
        name: userdata.name,
        email: userdata.email,
      });

      setUserData(res.data.data.user);
      alert("Profile updated!");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  const handleUpdatePassword = async () => {
    if (newpasswd != cpasswd) {
      setError("Passwords do not match.");
      alert(error);
      return;
    }
    try {
      const res = await api.put("/user/me/password", {
        currentPassword: oldpasswd,
        newPassword: newpasswd,
      });
      console.log(res);
      alert("password updated");
    } catch (err) {
      setError(err);
      alert("password update failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto ">
      {/* User Info Header */}
      <div className="border-b pb-6">
        <span className="text-3xl font-bold text-yellow-500 mr-6">
          {userdata.name}
        </span>
        {userdata.role == "admin" ? (
          <span className="text-red-600 text-lg">{userdata.role}</span>
        ) : null}
        <p className="text-gray-300 text-lg">{userdata.email}</p>
      </div>
      {/* Details Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Name</label>
          <input
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={userdata.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={userdata.email}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={handleSave}
          className="mt-6 p-3 bg-lime-500 text-white rounded-lg hover:ring-4 hover:bg-white hover:ring-lime-600 hover:text-lime-600"
        >
          Save
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">old password</label>
          <input
            type="password"
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={oldpasswd}
            onChange={(e) => setOldPasswd(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">New password</label>
          <input
            type="password"
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={newpasswd}
            onChange={(e) => setNewPasswd(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Confirm password</label>
          <input
            type="password"
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={cpasswd}
            onChange={(e) => setCPasswd(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={handleUpdatePassword}
          className="mt-6 p-3 bg-lime-500 text-white rounded-lg hover:ring-4 hover:bg-white hover:ring-lime-600 hover:text-lime-600"
        >
          Update Password
        </button>
      </div>
      {/* Logout */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-5 py-3 text-white bg-red-500 rounded-lg hover:bg-white hover:text-red-600 hover:ring-4 hover:ring-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
