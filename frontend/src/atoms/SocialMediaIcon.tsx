// components/SocialMediaIcon.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

interface SocialMediaIconProps {
  icon: React.ReactNode; // The icon (e.g., from react-icons)
  href: string; // The URL to link to
}

const IconWrapper = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.secondary}; // Vitality Cyan (#00AEEF)
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.brightWhite};
  font-size: 20px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.cloudWhite}; // Cloud White (#F9FAFB)
    color: ${colors.primary}; // Midnight Blue (#2A3E72)
  }
`;

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ icon, href }) => {
  return (
    <IconWrapper href={href} target="_blank" rel="noopener noreferrer">
      {icon}
    </IconWrapper>
  );
};

export default SocialMediaIcon;