<<<<<<< HEAD
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
=======
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, user, refreshUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setUploading(true);
      await axios.post("http://localhost:5000/api/users/me/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar uploaded successfully!");

      // ✅ Refresh user data in context
      await refreshUser();

    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload avatar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>My Profile</h2>

      {user?.avatar ? (
        <img
          src={`http://localhost:5000${user.avatar}`}
          alt="avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <p>No avatar</p>
      )}

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Avatar"}
>>>>>>> 1ab492634fd05fa351c1a29dad0f72afb59b8b1b
        </button>
      </div>
    </div>
  );
};

export default Profile;
