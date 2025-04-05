"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    healthGoals: "maintenance",
  });
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view your profile");
        }
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
        setFormData({
          name: response.data.name,
          age: response.data.age || "",
          weight: response.data.weight || "",
          height: response.data.height || "",
          healthGoals: response.data.healthGoals || "maintenance",
        });
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      setUpdateError("");
      setUpdateSuccess("");
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setUpdateSuccess("Profile updated successfully");
    } catch (err) {
      setUpdateError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Profile</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Age:</strong> {user.age || "Not set"}
        </p>
        <p>
          <strong>Weight:</strong> {user.weight || "Not set"} kg
        </p>
        <p>
          <strong>Height:</strong> {user.height || "Not set"} cm
        </p>
        <p>
          <strong>Health Goals:</strong>{" "}
          {user.healthGoals.charAt(0).toUpperCase() +
            user.healthGoals.slice(1).replace("-", " ")}
        </p>
      </div>
      <h3 style={{ textAlign: "center" }}>Update Profile</h3>
      {updateError && (
        <p style={{ color: "red", textAlign: "center" }}>{updateError}</p>
      )}
      {updateSuccess && (
        <p style={{ color: "green", textAlign: "center" }}>{updateSuccess}</p>
      )}
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={updateLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            disabled={updateLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Weight (kg):
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            disabled={updateLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Height (cm):
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            disabled={updateLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Health Goals:
          </label>
          <select
            name="healthGoals"
            value={formData.healthGoals}
            onChange={handleChange}
            disabled={updateLoading}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
            }}
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={updateLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: updateLoading ? "#666" : "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: updateLoading ? "not-allowed" : "pointer",
          }}
        >
          {updateLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
