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
        </button>
      </div>
    </div>
  );
};

export default Profile;
