// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     age: "",
//     weight: "",
//     height: "",
//     healthGoals: "maintenance",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.post(
//         "http://localhost:5000/api/users/register",
//         formData
//       );
//       localStorage.setItem("token", response.data.token);
//       router.push("/dashboard");
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Registration failed. User may already exist."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>Register</h2>
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//       <form onSubmit={handleRegister}>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>
//             Email:
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ display: "block", marginBottom: "5px" }}>
//             Password:
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
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
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
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
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
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
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
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
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "8px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               backgroundColor: loading ? "#f0f0f0" : "#fff",
//             }}
//           >
//             <option value="weight-loss">Weight Loss</option>
//             <option value="muscle-gain">Muscle Gain</option>
//             <option value="maintenance">Maintenance</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: loading ? "#666" : "#333",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: "10px" }}>
//         Already have an account?{" "}
//         <a href="/login" style={{ color: "#333" }}>
//           Login
//         </a>
//       </p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../../atoms/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

// Modern Input Component with Floating Label
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 28px;
  padding: 16px 12px 8px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
  background-color: ${colors.brightWhite};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    box-shadow: 0 0 12px rgba(0, 174, 239, 0.2);
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    transform: translateY(-24px) translateX(-8px) scale(0.85);
    color: ${colors.secondary};
    background: ${colors.brightWhite};
    padding: 0 4px;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: 16px;
  left: 12px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 56px;
  padding: 16px 12px;
  border: 1px solid #ccc; /* Match the image border */
  border-radius: 4px; /* Match the image border radius */
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
  background-color: ${colors.brightWhite};
  transition: all 0.3s ease;
  appearance: none; /* Remove default select arrow */
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23999" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>'); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// Main Layout
const RegisterContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 30%;
  background-color: ${colors.primary}; /* Dark blue from the image */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LogoText = styled.h1`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 36px;
  color: ${colors.brightWhite};
  margin: 0;
  display: flex;
  align-items: center;

  span {
    color: #47b881; /* Green color for "Lens" */
  }
`;

const Tagline = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 18px;
  color: ${colors.brightWhite};
  opacity: 0.8;
  margin: 0;
`;

const FormContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.brightWhite};
  padding: 40px;
`;

const FormWrapper = styled.div`
  max-width: 600px; /* Adjusted width for two columns */
  width: 100%;
`;

const Title = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 28px;
  color: ${colors.deepSlate};
  margin-bottom: 40px;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-family: ${fonts.poppins.family};
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
  background: rgba(255, 235, 235, 0.8);
  padding: 8px;
  border-radius: 4px;
`;

const FormColumns = styled.div`
  display: flex;
  gap: 32px; /* Gap between the two columns */
  margin-bottom: 40px;
`;

const FormColumn = styled.div`
  flex: 1;
`;

const LoginLink = styled.p`
  text-align: center;
  font-family: ${fonts.poppins.family};
  font-size: 14px;
  color: ${colors.deepSlate};
  margin-top: 24px;

  a {
    color: ${colors.secondary};
    text-decoration: none;
    font-weight: ${fonts.poppins.weights.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    healthGoals: "maintenance",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. User may already exist."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Sidebar>
        <Logo>
          <LogoText>
            FOOD <span>LENS</span>
          </LogoText>
        </Logo>
        <Tagline>Healthy Life</Tagline>
      </Sidebar>
      <FormContainer>
        <FormWrapper>
          <Title>Welcome to FoodLens</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleRegister}>
            {/* Two Columns Layout */}
            <FormColumns>
              {/* Left Column: Name, Email, Password, Age */}
              <FormColumn>
                <InputWrapper>
                  <StyledInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <InputLabel htmlFor="name">Name</InputLabel>
                </InputWrapper>
                <InputWrapper>
                  <StyledInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <InputLabel htmlFor="email">Email</InputLabel>
                </InputWrapper>
                <InputWrapper>
                  <StyledInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <InputLabel htmlFor="password">Password</InputLabel>
                </InputWrapper>
                <InputWrapper>
                  <StyledInput
                    type="number"
                    id="age"
                    name="age"
                    placeholder=" "
                    value={formData.age}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <InputLabel htmlFor="age">Age</InputLabel>
                </InputWrapper>
              </FormColumn>

              {/* Right Column: Weight, Height, Health Goals */}
              <FormColumn>
                <InputWrapper>
                  <StyledInput
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder=" "
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <InputLabel htmlFor="weight">Weight (kg)</InputLabel>
                </InputWrapper>
                <InputWrapper>
                  <StyledInput
                    type="number"
                    id="height"
                    name="height"
                    placeholder=" "
                    value={formData.height}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <InputLabel htmlFor="height">Height (cm)</InputLabel>
                </InputWrapper>
                <InputWrapper>
                  <StyledSelect
                    id="healthGoals"
                    name="healthGoals"
                    value={formData.healthGoals}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                  </StyledSelect>
                </InputWrapper>
              </FormColumn>
            </FormColumns>

            <Button
              variant="primary"
              size="large"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <LoginLink>
            Already have an account? <a href="/login">Login</a>
          </LoginLink>
        </FormWrapper>
      </FormContainer>
    </RegisterContainer>
  );
}
