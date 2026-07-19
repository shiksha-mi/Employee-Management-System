import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
  
const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const response = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        updateUser(response.data.user);
        alert("Profile Updated Successfully!");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  const changePassword = async () => {
  if (
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.confirmPassword
  ) {
    return alert("Please fill all fields");
  }

  if (
    passwordData.newPassword !==
    passwordData.confirmPassword
  ) {
    return alert("Passwords do not match");
  }

  try {
    const response = await axios.put(
      "http://localhost:5000/api/auth/change-password",
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Password Changed Successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  } catch (error) {
    alert(
      error.response?.data?.error ||
      "Failed to change password"
    );
  }
};

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl">

        {/* Profile Section */}
        <div className="flex items-center gap-6 mb-8">

          <div className="flex flex-col items-center">

            <img
              src={
                user?.profileImage
                  ? `http://localhost:5000/uploads/${user.profileImage}`
                  : "https://via.placeholder.com/120"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="mt-3 text-sm"
            />

          </div>

          <div>
            <h3 className="text-2xl font-bold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-500 capitalize">{user?.role}</p>
          </div>

        </div>

        <hr className="mb-6" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Role
            </label>

            <input
              type="text"
              value={user?.role || ""}
              readOnly
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <hr className="my-8" />

<h3 className="text-2xl font-bold mb-5">
  Change Password
</h3>

<div className="space-y-4">

  <div>
    <label className="block font-semibold mb-2">
      Current Password
    </label>

    <div className="relative">
  <input
    type={showPassword.current ? "text" : "password"}
    name="currentPassword"
    value={passwordData.currentPassword}
    onChange={handlePasswordChange}
    placeholder="Enter Current Password"
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword({
        ...showPassword,
        current: !showPassword.current,
      })
    }
    className="absolute right-4 top-3 text-gray-500"
  >
    {showPassword.current ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
  </div>

  <div className="relative">
  <input
    type={showPassword.new ? "text" : "password"}
    name="newPassword"
    value={passwordData.newPassword}
    onChange={handlePasswordChange}
    placeholder="Enter New Password"
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword({
        ...showPassword,
        new: !showPassword.new,
      })
    }
    className="absolute right-4 top-3 text-gray-500"
  >
    {showPassword.new ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

  <div className="relative">
  <input
    type={showPassword.confirm ? "text" : "password"}
    name="confirmPassword"
    value={passwordData.confirmPassword}
    onChange={handlePasswordChange}
    placeholder="Confirm New Password"
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword({
        ...showPassword,
        confirm: !showPassword.confirm,
      })
    }
    className="absolute right-4 top-3 text-gray-500"
  >
    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

  <button
    type="button"
    onClick={changePassword}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
  >
    Change Password
  </button>

</div>

        </form>

      </div>
    </div>
  );
};

export default Settings;