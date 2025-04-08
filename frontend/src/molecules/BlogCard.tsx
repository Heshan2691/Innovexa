// components/BlogCard.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import Button from '../atoms/Button';

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
  onReadMore: () => void;
}

const Card = styled.div`
  width: 300px;
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ImageSection = styled.div`
  height: 150px;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentSection = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Date = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: ${colors.steelGray};
`;

const Title = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 18px;
  color: ${colors.deepSlate};
`;

const Description = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
`;

const FooterSection = styled.div`
  padding: 0 15px 15px 15px;
`;

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  date,
  title,
  description,
  onReadMore,
}) => {
  return (
    <Card>
      <ImageSection>
        <BlogImage src={image} alt={title} />
      </ImageSection>
      <ContentSection>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentSection>
      <FooterSection>
        <Button variant="primary" size="small" onClick={onReadMore}>
          Read More
        </Button>
      </FooterSection>
    </Card>
  );
};

export default BlogCard;