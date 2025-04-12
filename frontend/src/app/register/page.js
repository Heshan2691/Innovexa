"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../../atoms/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import api from "../../utils/api";

// Modern Input Component with Floating Label
const InputWrapper = styled.div`
  position: relative;
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

const StyledSelect = styled.select`
  width: 100%;
  height: 52px;
  padding: 16px 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
  background-color: ${colors.brightWhite};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  appearance: none; /* Remove default arrow */
  background-image: url('data:image/svg+xml;utf8,<svg fill="gray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>'); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 12px center;

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

// Main Layout
const RegisterContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 30%;
  background-color: #1a3c5e; /* Dark blue from the image */
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
  max-width: 400px;
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

const SuccessMessage = styled.p`
  color: #47b881;
  font-family: ${fonts.poppins.family};
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
  background: rgba(231, 245, 237, 0.8);
  padding: 8px;
  border-radius: 4px;
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

const InputRow = styled.div`
  display: flex;
  gap: 16px;
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
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.weight ||
      !formData.height
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (
      parseInt(formData.age) < 0 ||
      parseInt(formData.weight) < 0 ||
      parseInt(formData.height) < 0
    ) {
      setError("Age, weight, and height must be positive numbers");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.post("/users/register", formData);

      const { token } = response.data;
      localStorage.setItem("token", token);
      setSuccess("Registration successful! Redirecting...");

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <form onSubmit={handleRegister}>
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
            <InputRow>
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
            </InputRow>
            <InputWrapper>
              <StyledSelect
                id="healthGoals"
                name="healthGoals"
                value={formData.healthGoals}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="maintenance">Maintain Health</option>
                <option value="weight-loss">Lose Weight</option>
                <option value="muscle-gain">Gain Muscle</option>
              </StyledSelect>
              <InputLabel htmlFor="healthGoals">Health Goals</InputLabel>
            </InputWrapper>
            <Button
              variant="primary"
              size="large"
              type="submit"
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
