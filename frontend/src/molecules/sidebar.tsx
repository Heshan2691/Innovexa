"use client"

import type React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"
import Button from "../atoms/Button"
import TaskCard from "../atoms/TaskProgressCard"

// Define props for the Sidebar component
interface SidebarProps {
  height?: string // e.g., "178cm"
  weight?: string // e.g., "70kg"
  userName?: string
  membershipStatus?: string
  avatarContent?: string
  isOnline?: boolean
}

// Styled components for the Sidebar
const SidebarContainer = styled.div`
  width: 319px; // Specified width
  height: 100vh;
  background-color: ${colors.primary}; // Midnight Blue (#2A3E72)
  color: ${colors.brightWhite};
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  font-family: ${fonts.poppins.family};
  overflow-y: auto;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`

const LogoText = styled.div`
  font-size: 20px;
  font-weight: ${fonts.poppins.weights.bold};
  color: ${colors.tertiary}; // Green color for logo
  display: flex;
  align-items: center;
  gap: 4px;
`

const LeafIcon = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.tertiary};
    border-radius: 50% 0 50% 50%;
    transform: rotate(45deg);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background-color: ${colors.brightWhite};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`

const AvatarBackground = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #e9d8fd; // Light purple background
  display: flex;
  align-items: center;
  justify-content: center;
`

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-color: ${colors.tertiary}; // Green for online status
  border: 2px solid ${colors.primary};
  border-radius: 50%;
`

const UserName = styled.div`
  font-size: 18px;
  font-weight: ${fonts.poppins.weights.semiBold};
  margin-bottom: 4px;
`

const MembershipStatus = styled.div`
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.regular};
  color: #a0aec0; // Light gray for membership status
  margin-bottom: 16px;
`

const Stats = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.medium};
  gap: 6px;
`

const Dot = styled.span<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`

const TaskCardContainer = styled.div`
  margin-bottom: 24px;
  transform: scale(0.9);
  transform-origin: top center;
`

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`

const NavButton = styled(Button)`
  width: 100%;
  height: 48px;
  justify-content: flex-start;
  padding-left: 20px;
  gap: 12px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${colors.brightWhite};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const LogOutButton = styled(NavButton)`
  margin-top: 24px;
`

// Sidebar component
const Sidebar: React.FC<SidebarProps> = ({
  height = "178cm", // Default values
  weight = "70kg",
  userName = "John Doe",
  membershipStatus = "Premium Member",
  avatarContent = "😊",
  isOnline = true,
}) => {
  const handleNavClick = (section: string) => {
    console.log(`Navigating to ${section}`)
  }

  return (
    <SidebarContainer>
      {/* Logo */}
      <LogoContainer>
        <LogoText>
          FOOD
          <LeafIcon />
          LENS
        </LogoText>
      </LogoContainer>

      {/* Profile Section */}
      <ProfileSection>
        <AvatarContainer>
          <AvatarBackground>{avatarContent}</AvatarBackground>
          {isOnline && <OnlineIndicator />}
        </AvatarContainer>
        <UserName>{userName}</UserName>
        <MembershipStatus>{membershipStatus}</MembershipStatus>
        <Stats>
          <StatItem>
            <Dot color="#06B6D4" /> Weight {height}
          </StatItem>
          <StatItem>
            <Dot color="#F87171" /> Height {weight}
          </StatItem>
        </Stats>
      </ProfileSection>

      {/* Task Progress Card */}
      <TaskCardContainer>
        <TaskCard progress={85} taskText="Your today's task almost done!" buttonText="View Task" showLabel={false} />
      </TaskCardContainer>

      {/* Navigation Buttons */}
      <NavSection>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("Dashboard")}>
          <span style={{ color: "#06B6D4" }}>⚡</span> Dashboard
        </NavButton>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("Log Food")}>
          <span style={{ color: "#06B6D4" }}>🍽️</span> Log Food
        </NavButton>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("View Insights")}>
          <span style={{ color: "#06B6D4" }}>📊</span> View Insights
        </NavButton>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("Track Me")}>
          <span style={{ color: "#06B6D4" }}>📍</span> Track Me
        </NavButton>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("Get Meal Ideas")}>
          <span style={{ color: "#06B6D4" }}>🍴</span> Get Meal Ideas
        </NavButton>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("Play EatSmart")}>
          <span style={{ color: "#06B6D4" }}>🎮</span> Play EatSmart
        </NavButton>
        <NavButton variant="secondary" size="medium" onClick={() => handleNavClick("Plan Your Diet")}>
          <span style={{ color: "#06B6D4" }}>📅</span> Plan Your Diet
        </NavButton>

        {/* Log Out Button */}
        <LogOutButton variant="secondary" size="medium" onClick={() => handleNavClick("Log Out")}>
          <span style={{ color: "#06B6D4" }}>←</span> Log Out
        </LogOutButton>
      </NavSection>
    </SidebarContainer>
  )
}

export default Sidebar

