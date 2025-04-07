// components/Footer.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import SocialMediaIcon from '../atoms/SocialMediaIcon';
import FooterLink from '../atoms/FooterLink';
import InstagramImage from '../atoms/InstagramImage';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

// Styled components for the Footer
const FooterContainer = styled.footer`
  width: full; // Specified width
  height: 533px; // Specified height
  background-color: ${colors.primary}; // Midnight Blue (#2A3E72)
  color: ${colors.brightWhite};
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  font-family: ${fonts.poppins.family};
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: ${fonts.poppins.weights.bold};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LeafIcon = styled.span`
  color: ${colors.tertiary}; // Lime Green (#47B881)
  font-size: 28px;
`;

const Tagline = styled.div`
  font-size: 16px;
  font-weight: ${fonts.poppins.weights.regular};
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactTitle = styled.div`
  font-size: 18px;
  font-weight: ${fonts.poppins.weights.semiBold};
`;

const ContactDetail = styled.div`
  font-size: 16px;
  font-weight: ${fonts.poppins.weights.regular};
`;

const InstagramFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InstagramTitle = styled.div`
  font-size: 18px;
  font-weight: ${fonts.poppins.weights.semiBold};
`;

const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Copyright = styled.div`
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.regular};
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid ${colors.steelGray};
  padding-top: 20px;
`;

const CopyrightLinks = styled.span`
  display: inline-flex;
  gap: 10px;
  margin-left: 10px;
`;

// Footer component
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Left Section: Logo, Tagline, Social Icons */}
        <LeftSection>
          <Logo>
            FOOD LENS <LeafIcon>🍃</LeafIcon>
          </Logo>
          <Tagline>Your AI companion for healthier eating.</Tagline>
          <SocialIcons>
            <SocialMediaIcon
              icon={<FaTwitter />}
              href="https://twitter.com"
            />
            <SocialMediaIcon
              icon={<FaFacebookF />}
              href="https://facebook.com"
            />
            <SocialMediaIcon
              icon={<FaInstagram />}
              href="https://instagram.com"
            />
            <SocialMediaIcon
              icon={<FaGithub />}
              href="https://github.com"
            />
          </SocialIcons>
        </LeftSection>

        {/* Middle Section: Navigation Links */}
        <MiddleSection>
          <NavLinks>
            <FooterLink href="/dashboard">Dashboard</FooterLink>
            <FooterLink href="/log-food">Log Food</FooterLink>
            <FooterLink href="/track-me">Track Me</FooterLink>
            <FooterLink href="/insights">Insights</FooterLink>
            <FooterLink href="/meal-ideas">Meal Ideas</FooterLink>
            <FooterLink href="/plan-your-diet">Plan Your Diet</FooterLink>
            <FooterLink href="/play-eatsmart">Play EatSmart</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </NavLinks>
        </MiddleSection>

        {/* Right Section: Contact Info and Instagram Feed */}
        <RightSection>
          <ContactInfo>
            <ContactTitle>Help | Contact Us</ContactTitle>
            <ContactDetail>Email: support@foodlens.com</ContactDetail>
            <ContactDetail>Tel: +94771234567</ContactDetail>
          </ContactInfo>
          <InstagramFeed>
            <InstagramTitle>Follow Us On Instagram</InstagramTitle>
            <InstagramGrid>
              <InstagramImage
                src="/images/image4.jpeg"
                alt="Fries"
              />
              <InstagramImage
                src="/images/image3.jpeg"
                alt="Eggs"
              />
              <InstagramImage
                src="/images/image1.jpeg"
                alt="Salad"
              />
              <InstagramImage
                src="/images/image2.jpeg"
                alt="Pancakes"
              />
            </InstagramGrid>
          </InstagramFeed>
        </RightSection>
      </FooterContent>

      {/* Copyright Notice */}
      <Copyright>
        © 2025 HealthTracker. All rights reserved.
        <CopyrightLinks>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        </CopyrightLinks>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;