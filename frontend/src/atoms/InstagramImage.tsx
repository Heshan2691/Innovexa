// components/InstagramImage.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

interface InstagramImageProps {
  src: string; // Image URL
  alt: string; // Alt text for accessibility
}

const ImageWrapper = styled.div`
  width: 150px; // Adjusted to fit 2x2 grid within footer
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${colors.cloudWhite};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InstagramImage: React.FC<InstagramImageProps> = ({ src, alt }) => {
  return (
    <ImageWrapper>
      <StyledImage src={src} alt={alt} />
    </ImageWrapper>
  );
};

export default InstagramImage;