// components/Input.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state?: 'default' | 'success' | 'error';
}

const InputWrapper = styled.div`
  width: 360px;
  height: 74px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.deepSlate};
  margin-bottom: 6px;
`;

const StyledInput = styled.input<{ state: string }>`
  width: 100%;
  height: 48px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${colors.brightWhite};
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
  border: 2px solid;

  // Dynamic border color based on state
  ${({ state }) => {
    switch (state) {
      case 'success':
        return `border-color: ${colors.tertiary};`; // Green (#47B881)
      case 'error':
        return `border-color: #EF4444;`; // Red
      default:
        return `border-color: #D3B7FF;`; // Purple (default)
    }
  }}

  &::placeholder {
    color: ${colors.steelGray};
  }

  &:focus {
    outline: none;
    border-color: ${colors.secondary}; // Cyan (#00AEEF) on focus
  }
`;

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  state = 'default',
}) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        state={state}
      />
    </InputWrapper>
  );
};

export default Input;