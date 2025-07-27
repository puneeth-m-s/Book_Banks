import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch {
        alert("Failed to load profile");
      }
    };
    fetchUser();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/users/me",
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPassword("");
      setSuccess(true);
    } catch {
      alert("Failed to update");
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/me/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
      alert("Avatar uploaded successfully!");
    } catch {
      alert("Failed to upload avatar.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}>
      {/* ✅ Show Avatar at Top */}
      {user.avatar && (
        <img
          src={`http://localhost:5000${user.avatar}`}
          alt="Avatar"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "1rem",
            border: "2px solid #ccc",
          }}
        />
      )}

      <h2>Profile</h2>
      {success && <p style={{ color: "green" }}>Profile updated successfully</p>}
      <form onSubmit={handleUpdate} style={{ textAlign: "left" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>New Password:</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Update
        </button>
      </form>

      {/* ✅ Avatar Upload Section */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Change Avatar</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <button onClick={handleAvatarUpload} style={{ marginTop: "0.5rem" }}>
          Upload Avatar
        </button>
      </div>
    </div>
  );
};

export default Profile;
