import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Logout} from "../features/auth/authSlice";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/auth/authSlice.js";
import {useEffect, useState} from "react";
import api from "../axiosInstance";
import ResponseModal from "../Components/ResponseModal.jsx";
import {Link} from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userdata, setUserData] = useState(null);
  const [oldpasswd, setOldPasswd] = useState("");
  const [newpasswd, setNewPasswd] = useState("");
  const [cpasswd, setCPasswd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    type: "",
  });
  const [role, setRole] = useState("user");
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    const r = localStorage.getItem("role") || "user";
    setRole(r);
  }, [user]);
  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/me/profile");

        setUserData(res.data.data.user);
        setName(res.data.data.user.name);
        setEmail(res.data.data.user.email);
      } catch (err) {
        if (err.status == 401) {
          dispatch(Logout());
          localStorage.clear("role");
          localStorage.clear("token");
           navigate("/login");
        }
      }
    };
    fetchProfile();
  }, [user]);

  // if (!userdata) return;

  const handleSave = async () => {
    try {
      const res = await api.put("/user/me/update", {
        name: name,
        email: email,
      });

      setModalData({
        title: "Success! 🎉",
        message: "Details updated.",
        type: "success",
      });
      setIsModalOpen(true);
      setUserData(res.data.data.user);
    } catch (err) {
      setModalData({
        title: "Error",
        message: "Error while updating.",
        type: "error",
      });
      setIsModalOpen(true);
    }
  };

  const handleUpdatePassword = async () => {
    if (newpasswd != cpasswd) {
      alert(error);
      return;
    }
    try {
      const res = await api.put("/user/me/password", {
        currentPassword: oldpasswd,
        newPassword: newpasswd,
      });
      setModalData({
        title: "Success! 🎉",
        message: "Password updated.",
        type: "success",
      });
      setIsModalOpen(true);
    } catch (err) {
      setModalData({
        title: "Error",
        message: err.response.data.message,
        type: "error",
      });
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({title: "", message: "", type: ""});
  };
  return (
    <div className="p-8 max-w-5xl mx-auto ">
      {/* User Info Header */}
      <div className="border-b pb-6">
        <span className="text-3xl font-bold text-yellow-500 mr-6">
          {userdata?.name}
        </span>
        {userdata?.role == "admin" ? (
          <span className="text-red-600 text-lg">{userdata.role}</span>
        ) : null}
        <p className="text-gray-300 text-lg">{email}</p>
      </div>
      {role == "admin" ? (
        <Link to="/addProduct" className="bg-white">
          <div className="m-2">
            <button className="bg-purple-400 p-2 rounded-md text-white m-2 ">
              add new products
            </button>
          </div>
        </Link>
      ) : null}
      {/* Details Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Name</label>
          <input
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={handleSave}
          className="mt-6 p-3 bg-lime-500 text-white rounded-lg lg:hover:ring-4 lg:hover:bg-white lg:hover:ring-lime-600 lg:hover:text-lime-600"
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
          className="mt-6 p-3 bg-lime-500 text-white rounded-lg lg:hover:ring-4 lg:hover:bg-white lg:hover:ring-lime-600 lg:hover:text-lime-600"
        >
          Update Password
        </button>
      </div>
      {/* Logout */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-5 py-3 text-white bg-red-500 rounded-lg lg:hover:bg-white lg:hover:text-red-600 lg:hover:ring-4 lg:hover:ring-red-600"
        >
          Logout
        </button>
      </div>
      <ResponseModal
        isOpen={isModalOpen}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type}
        onClose={closeModal}
      />
    </div>
  );
};

export default Profile;
