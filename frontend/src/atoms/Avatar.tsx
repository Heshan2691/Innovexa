// components/Avatar.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { FaSmile } from 'react-icons/fa';

interface AvatarProps {
  variant: 'emoji' | 'initial' | 'icon'; // Avatar style
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Avatar size
  content: string; // Emoji, initial letter, or ignored for icon
  isOnline?: boolean; // Show online status indicator
}

const AvatarWrapper = styled.div<{ size: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  // Dynamic size based on prop
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return `
          width: 24px;
          height: 24px;
        `;
      case 'sm':
        return `
          width: 32px;
          height: 32px;
        `;
      case 'md':
        return `
          width: 48px;
          height: 48px;
        `;
      case 'lg':
        return `
          width: 64px;
          height: 64px;
        `;
      case 'xl':
        return `
          width: 80px;
          height: 80px;
        `;
      default:
        return `
          width: 48px;
          height: 48px;
        `;
    }
  }}
`;

const EmojiAvatar = styled.div<{ size: string }>`
  background-color: #d3b7ff; // Light purple
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  // Dynamic font size based on avatar size
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return `font-size: 12px;`;
      case 'sm':
        return `font-size: 16px;`;
      case 'md':
        return `font-size: 24px;`;
      case 'lg':
        return `font-size: 32px;`;
      case 'xl':
        return `font-size: 40px;`;
      default:
        return `font-size: 24px;`;
    }
  }}
`;

const InitialAvatar = styled.div<{ size: string }>`
  background-color: ${colors.secondary}; // Vitality Cyan (#00AEEF)
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  color: ${colors.brightWhite};

  // Dynamic font size based on avatar size
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return `font-size: 12px;`;
      case 'sm':
        return `font-size: 16px;`;
      case 'md':
        return `font-size: 24px;`;
      case 'lg':
        return `font-size: 32px;`;
      case 'xl':
        return `font-size: 40px;`;
      default:
        return `font-size: 24px;`;
    }
  }}
`;

const IconAvatar = styled.div<{ size: string }>`
  background-color: ${colors.secondary}; // Vitality Cyan (#00AEEF)
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${colors.brightWhite};

  // Dynamic icon size based on avatar size
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return `font-size: 12px;`;
      case 'sm':
        return `font-size: 16px;`;
      case 'md':
        return `font-size: 24px;`;
      case 'lg':
        return `font-size: 32px;`;
      case 'xl':
        return `font-size: 40px;`;
      default:
        return `font-size: 24px;`;
    }
  }}
`;

const OnlineIndicator = styled.div<{ size: string }>`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${colors.tertiary}; // Lime Green (#47B881)
  border: 2px solid ${colors.brightWhite};
  border-radius: 50%;

  // Dynamic size of the indicator based on avatar size
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return `
          width: 8px;
          height: 8px;
        `;
      case 'sm':
        return `
          width: 10px;
          height: 10px;
        `;
      case 'md':
        return `
          width: 14px;
          height: 14px;
        `;
      case 'lg':
        return `
          width: 18px;
          height: 18px;
        `;
      case 'xl':
        return `
          width: 22px;
          height: 22px;
        `;
      default:
        return `
          width: 14px;
          height: 14px;
        `;
    }
  }}
`;

const Avatar: React.FC<AvatarProps> = ({
  variant,
  size = 'md',
  content,
  isOnline = false,
}) => {
  return (
    <AvatarWrapper size={size}>
      {variant === 'emoji' && (
        <EmojiAvatar size={size}>{content}</EmojiAvatar>
      )}
      {variant === 'initial' && (
        <InitialAvatar size={size}>{content}</InitialAvatar>
      )}
      {variant === 'icon' && (
        <IconAvatar size={size}>
          <FaSmile />
        </IconAvatar>
      )}
      {isOnline && <OnlineIndicator size={size} />}
    </AvatarWrapper>
  );
};

export default Avatar;