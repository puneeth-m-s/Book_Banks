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
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Profile</h2>
      {success && <p style={{ color: "green" }}>Profile updated successfully</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>New Password:</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Update
        </button>
      </form>

      {/* Avatar Upload */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Avatar</h3>
        {user.avatar && (
          <img
            src={`http://localhost:5000${user.avatar}`}
            alt="Avatar"
            style={{ width: "100px", borderRadius: "50%", marginBottom: "1rem" }}
          />
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
          <button onClick={handleAvatarUpload}>Upload Avatar</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
