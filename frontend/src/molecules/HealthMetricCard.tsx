"use client";

import React from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

// Styled components for the health metric card
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 150px;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  font-size: 24px; /* Adjust based on your icon size */
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
  margin-bottom: 8px;
  text-align: center;
`;

const Input = styled.input`
  width: 80px;
  padding: 5px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-family: ${fonts.poppins.family};
  font-size: 16px;
  text-align: center;
  outline: none;
  &:focus {
    border-color: ${colors.secondary};
  }
`;

interface HealthMetricCardProps {
  icon: string; // Emoji or icon placeholder
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  icon,
  label,
  value,
  onChange,
  name,
  placeholder,
}) => {
  return (
    <CardContainer>
      <IconContainer>{icon}</IconContainer>
      <Label>{label}</Label>
      <Input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </CardContainer>
  );
};

export default HealthMetricCard;
