// components/Sidebar.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import Button from '../atoms/Button';
import TaskProgressCard from '../atoms/TaskProgressCard';

// Define props for the Sidebar component
interface SidebarProps {
  height?: string; // e.g., "178cm"
  weight?: string; // e.g., "70kg"
}

// Styled components for the Sidebar
const SidebarContainer = styled.div`
  width: 319px; // Specified width
  height: 100vh;
  background-color: ${colors.primary}; // Midnight Blue (#2A3E72)
  color: ${colors.brightWhite};
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: ${fonts.poppins.family};
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: ${fonts.poppins.weights.bold};
  margin-bottom: 30px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d3b7ff; // Light purple background for the avatar
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: ${fonts.poppins.weights.semiBold};
  margin-bottom: 5px;
`;

const MembershipStatus = styled.div`
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.regular};
  color: ${colors.steelGray};
  margin-bottom: 10px;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.medium};
`;

const Dot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 5px;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const NavButton = styled(Button)`
  width: 230px; // Specified width
  height: 48px; // Specified height (already default for medium size)
  justify-content: flex-start;
  padding-left: 15px;
  gap: 10px;
`;

const LogOutButton = styled(Button)`
  width: 230px; // Specified width
  height: 48px; // Specified height
  justify-content: flex-start;
  padding-left: 15px;
  gap: 10px;
  margin-top: auto; // Push to the bottom
`;

// Sidebar component
const Sidebar: React.FC<SidebarProps> = ({
  height = "178cm", // Default values
  weight = "70kg",
}) => {
  const handleNavClick = (section: string) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <SidebarContainer>
      {/* Logo */}
      <Logo>FOOD LENS</Logo>

      {/* Profile Section */}
      <ProfileSection>
        <Avatar>😊</Avatar>
        <UserName>John Doe</UserName>
        <MembershipStatus>Premium Member</MembershipStatus>
        <Stats>
          <StatItem>
            <Dot color="#00AEEF" /> {height}
          </StatItem>
          <StatItem>
            <Dot color="#FF6F91" /> {weight}
          </StatItem>
        </Stats>
      </ProfileSection>

      {/* Task Progress Card */}
      <TaskProgressCard />

      {/* Navigation Buttons */}
      <NavSection>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('Dashboard')}
        >
          ⚡ Dashboard
        </NavButton>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('Log Food')}
        >
          🍽️ Log Food
        </NavButton>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('View Insights')}
        >
          📊 View Insights
        </NavButton>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('Track Me')}
        >
          📍 Track Me
        </NavButton>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('Get Meal Ideas')}
        >
          🍴 Get Meal Ideas
        </NavButton>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('Play EatSmart')}
        >
          🎮 Play EatSmart
        </NavButton>
        <NavButton
          variant="secondary"
          size="medium"
          onClick={() => handleNavClick('Plan Your Diet')}
        >
          📅 Plan Your Diet
        </NavButton>
      </NavSection>

      {/* Log Out Button */}
      <LogOutButton
        variant="secondary"
        size="medium"
        onClick={() => handleNavClick('Log Out')}
      >
        ← Log Out
      </LogOutButton>
    </SidebarContainer>
  );
};

export default Sidebar;