// components/FooterLink.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const StyledLink = styled.a`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.brightWhite};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${colors.secondary}; // Vitality Cyan (#00AEEF)
  }
`;

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLink>
  );
};

export default FooterLink;