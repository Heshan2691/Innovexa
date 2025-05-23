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
const LoginContainer = styled.div`
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

const RegisterLink = styled.p`
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      setSuccess("");

      const response = await api.post("/users/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      setSuccess("Login successful! Redirecting...");

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
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
          <form onSubmit={handleLogin}>
            <InputWrapper>
              <StyledInput
                type="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <InputLabel htmlFor="email">Enter your email here</InputLabel>
            </InputWrapper>
            <InputWrapper>
              <StyledInput
                type="password"
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <InputLabel htmlFor="password">
                Enter your password here
              </InputLabel>
            </InputWrapper>
            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <RegisterLink>
            Don’t have an account? <a href="/register">Register</a>
          </RegisterLink>
        </FormWrapper>
      </FormContainer>
    </LoginContainer>
  );
}
