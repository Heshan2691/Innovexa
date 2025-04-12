// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     weight: "",
//     height: "",
//     healthGoals: "maintenance",
//   });
//   const [loading, setLoading] = useState(true);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [updateError, setUpdateError] = useState("");
//   const [updateSuccess, setUpdateSuccess] = useState("");

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Please log in to view your profile");
//         }
//         const decodedToken = JSON.parse(atob(token.split(".")[1]));
//         const userId = decodedToken.id;
//         const response = await axios.get(
//           `http://localhost:5000/api/users/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setUser(response.data);
//         setFormData({
//           name: response.data.name,
//           age: response.data.age || "",
//           weight: response.data.weight || "",
//           height: response.data.height || "",
//           healthGoals: response.data.healthGoals || "maintenance",
//         });
//       } catch (err) {
//         setError(err.message || "Failed to fetch profile");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdateLoading(true);
//       setUpdateError("");
//       setUpdateSuccess("");
//       const token = localStorage.getItem("token");
//       const decodedToken = JSON.parse(atob(token.split(".")[1]));
//       const userId = decodedToken.id;
//       const response = await axios.put(
//         `http://localhost:5000/api/users/${userId}`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUser(response.data);
//       setUpdateSuccess("Profile updated successfully");
//     } catch (err) {
//       setUpdateError(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "20px" }}>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: "center", padding: "20px" }}>
//         <p style={{ color: "red" }}>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>Profile</h2>
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "15px",
//           borderRadius: "4px",
//           marginBottom: "20px",
//         }}
//       >
//         <p>
//           <strong>Name:</strong> {user.name}
//         </p>
//         <p>
//           <strong>Email:</strong> {user.email}
//         </p>
//         <p>
//           <strong>Age:</strong> {user.age || "Not set"}
//         </p>
//         <p>
//           <strong>Weight:</strong> {user.weight || "Not set"} kg
//         </p>
//         <p>
//           <strong>Height:</strong> {user.height || "Not set"} cm
//         </p>
//         <p>
//           <strong>Health Goals:</strong>{" "}
//           {user.healthGoals.charAt(0).toUpperCase() +
//             user.healthGoals.slice(1).replace("-", " ")}
//         </p>
//       </div>
//       <h3 style={{ textAlign: "center" }}>Update Profile</h3>
//       {updateError && (
//         <p style={{ color: "red", textAlign: "center" }}>{updateError}</p>
//       )}
//       {updateSuccess && (
//         <p style={{ color: "green", textAlign: "center" }}>{updateSuccess}</p>
//       )}
//       <form onSubmit={handleUpdate}>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             disabled={updateLoading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             disabled={updateLoading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>
//             Weight (kg):
//           </label>
//           <input
//             type="number"
//             name="weight"
//             value={formData.weight}
//             onChange={handleChange}
//             required
//             disabled={updateLoading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>
//             Height (cm):
//           </label>
//           <input
//             type="number"
//             name="height"
//             value={formData.height}
//             onChange={handleChange}
//             required
//             disabled={updateLoading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>
//             Health Goals:
//           </label>
//           <select
//             name="healthGoals"
//             value={formData.healthGoals}
//             onChange={handleChange}
//             disabled={updateLoading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: updateLoading ? "#f0f0f0" : "#fff",
//             }}
//           >
//             <option value="weight-loss">Weight Loss</option>
//             <option value="muscle-gain">Muscle Gain</option>
//             <option value="maintenance">Maintenance</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           disabled={updateLoading}
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: updateLoading ? "#666" : "#333",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: updateLoading ? "not-allowed" : "pointer",
//           }}
//         >
//           {updateLoading ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import Sidebar from "../../molecules/sidebar";

const ProfileContainer = styled.div`
  max-width: full;
  margin: 60px auto;
  padding: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 32px;
  color: ${colors.deepSlate};
  text-align: center;
  margin-bottom: 32px;
  background: linear-gradient(90deg, ${colors.secondary}, ${colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProfileInfo = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.cloudWhite},
    ${colors.brightWhite}
  );
  padding: 24px;
  border-radius: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  color: ${colors.secondary};
`;

const Value = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
`;

const FormSection = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Message = styled.p`
  text-align: center;
  margin: 16px 0;
  font-family: ${fonts.poppins.family};
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 12px;
  border-radius: 8px;
  background: ${colors.brightWhite};
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
  border: 2px solid rgba(211, 183, 255, 0.5);
  margin-top: 6px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    box-shadow: 0 0 8px rgba(0, 174, 239, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
        if (!token) throw new Error("Please log in to view your profile");
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;
        const response = await axios.get(
          process.env.NEXT_PUBLIC_URL + `/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
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
      if (!token) throw new Error("No authentication token found");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await axios.put(
        process.env.NEXT_PUBLIC_URL + `/users/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      setUpdateSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <Message style={{ background: "rgba(255, 255, 255, 0.8)" }}>
        Loading...
      </Message>
    );
  }

  if (error) {
    return (
      <Message
        style={{ color: "#EF4444", background: "rgba(255, 235, 235, 0.8)" }}
      >
        {error}
      </Message>
    );
  }

  return (
    <ProfileContainer>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Title>Profile</Title>
          <ProfileInfo>
            <InfoItem>
              <Label>Name:</Label>
              <Value>{user.name}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email:</Label>
              <Value>{user.email}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Age:</Label>
              <Value>{user.age || "Not set"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Weight:</Label>
              <Value>{user.weight || "Not set"} kg</Value>
            </InfoItem>
            <InfoItem>
              <Label>Height:</Label>
              <Value>{user.height || "Not set"} cm</Value>
            </InfoItem>
            <InfoItem>
              <Label>Health Goals:</Label>
              <Value>
                {user.healthGoals.charAt(0).toUpperCase() +
                  user.healthGoals.slice(1).replace("-", " ")}
              </Value>
            </InfoItem>
            <Button
              variant="primary"
              size="medium"
              onClick={() => setIsEditing(!isEditing)}
              style={{ marginTop: "20px", width: "100%" }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </ProfileInfo>

          {isEditing && (
            <FormSection>
              {updateError && (
                <Message
                  style={{
                    color: "#EF4444",
                    background: "rgba(255, 235, 235, 0.8)",
                  }}
                >
                  {updateError}
                </Message>
              )}
              {updateSuccess && (
                <Message
                  style={{
                    color: colors.tertiary,
                    background: "rgba(235, 255, 245, 0.8)",
                  }}
                >
                  {updateSuccess}
                </Message>
              )}
              <form onSubmit={handleUpdate}>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  state={updateError ? "error" : "default"}
                />
                <Input
                  label="Age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  state={updateError ? "error" : "default"}
                />
                <Input
                  label="Weight (kg)"
                  placeholder="Enter your weight"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  state={updateError ? "error" : "default"}
                />
                <Input
                  label="Height (cm)"
                  placeholder="Enter your height"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  state={updateError ? "error" : "default"}
                />
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: fonts.poppins.family,
                      fontSize: "14px",
                      color: colors.deepSlate,
                      marginBottom: "6px",
                    }}
                  >
                    Health Goals
                  </label>
                  <Select
                    name="healthGoals"
                    value={formData.healthGoals}
                    onChange={handleChange}
                    disabled={updateLoading}
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                  </Select>
                </div>
                <Button
                  variant="primary"
                  size="large"
                  disabled={updateLoading}
                  style={{ width: "100%" }}
                >
                  {updateLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </FormSection>
          )}
        </div>
      </div>
    </ProfileContainer>
  );
}
