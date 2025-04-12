"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
import Button from "../atoms/Button";
import api from "../utils/api";

// Constants for repeated values
const BORDER_COLOR = "rgba(255, 255, 255, 0.15)";
const BORDER_COLOR_HOVER = "rgba(255, 255, 255, 0.3)";
const BACKGROUND_HOVER = "rgba(255, 255, 255, 0.1)";

const SidebarContainer = styled.div`
  /* Layout */
  width: 319px;
  height: full;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* Colors */
  background-color: ${colors.primary};
  color: ${colors.brightWhite};

  /* Typography */
  font-family: ${fonts.poppins.family};
`;

const LogoContainer = styled.div`
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const ProfileSection = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const AvatarContainer = styled.div`
  /* Layout */
  position: relative;
  margin-bottom: 16px;
`;

const AvatarBackground = styled.div`
  /* Layout */
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Styles */
  border-radius: 20%;
  background-color: #e9d8fd;

  /* Typography */
  font-size: 48px;
`;

const OnlineIndicator = styled.div`
  /* Layout */
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;

  /* Styles */
  background-color: ${colors.tertiary};
  border: 2px solid ${colors.primary};
  border-radius: 50%;
`;

const MembershipStatus = styled.div`
  /* Typography */
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.regular};
  color: #a0aec0;

  /* Layout */
  margin-bottom: 16px;
`;

const Stats = styled.div`
  /* Layout */
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  /* Layout */
  display: flex;
  align-items: center;
  gap: 6px;

  /* Typography */
  font-size: 14px;
  font-weight: ${fonts.poppins.weights.medium};
`;

const Dot = styled.span`
  /* Layout */
  width: 8px;
  height: 8px;

  /* Styles */
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const NavSection = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  align-items: center;
`;

const NavButton = styled(Button)`
  /* Layout */
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  /* Typography */
  font-size: 16px;
  font-weight: ${fonts.poppins.weights.medium};
  color: ${colors.brightWhite};

  /* Styles */
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid ${BORDER_COLOR};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  /* Hover State */
  &:hover {
    background: ${BACKGROUND_HOVER};
    border-color: ${BORDER_COLOR_HOVER};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  /* Active State (when pressed) */
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* Icon Styling */
  & span {
    font-size: 18px;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: scale(1.2);
  }
`;

const ActiveNavButton = styled(NavButton)`
  /* Styles */
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  border-color: ${BORDER_COLOR_HOVER};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  /* Icon Color */
  & span {
    color: ${colors.secondary};
    font-weight: ${fonts.poppins.weights.bold};
  }
`;

const LogOutButton = styled(NavButton)`
  /* Layout */
  margin-top: 24px;

  /* Styles */
  border-color: rgba(
    255,
    111,
    97,
    0.3
  ); /* Using colors.tertiary for the border */
  color: ${colors.tertiary};

  /* Hover State */
  &:hover {
    background: rgba(255, 111, 97, 0.1);
    border-color: rgba(255, 111, 97, 0.5);
    color: ${colors.tertiary};
  }

  /* Active State */
  &:active {
    background: rgba(255, 111, 97, 0.2);
  }

  /* Icon Styling */
  & span {
    color: ${colors.tertiary};
  }
`;

export default function Sidebar({
  height: initialHeight = "178cm",
  weight: initialWeight = "70kg",
  userName: initialUserName = "John Doe",
  membershipStatus: initialMembershipStatus = "Premium Member",
  avatarContent = "😊",
  isOnline = true,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, setUserName] = useState(initialUserName);
  const [height, setHeight] = useState(initialHeight);
  const [weight, setWeight] = useState(initialWeight);
  const [membershipStatus, setMembershipStatus] = useState(
    initialMembershipStatus
  );

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setUserName(userData.name || initialUserName);
        setHeight(userData.height || initialHeight);
        setWeight(userData.weight || initialWeight);
        setMembershipStatus(
          userData.membershipStatus || initialMembershipStatus
        );
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [initialHeight, initialMembershipStatus, initialUserName, initialWeight]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  // Determine if a nav button is active based on the current pathname
  const routeMap = {
    Dashboard: "/dashboard",
    "Log Food": "/meal-ai",
    "View Insights": "/view-insights",
    "Track Me": "/add-data",
    "Get Meal Ideas": "/meal-ideas",
    "Play EatSmart": "/play-eatsmart",
    "Plan Your Diet": "/diet-planner",
    "Our Blog": "/meal-blogs",
    Profile: "/profile",
  };

  const isActive = (page: keyof typeof routeMap) => {
    return pathname === routeMap[page];
  };

  return (
    <SidebarContainer>
      {/* Logo Image */}
      <LogoContainer>
        <Image
          src="/logo1.png"
          alt="FoodLens Logo"
          width={150}
          height={150}
          priority
        />
      </LogoContainer>

      {/* Profile Section */}
      <ProfileSection>
        <AvatarContainer>
          <AvatarBackground>{avatarContent}</AvatarBackground>
          {isOnline && <OnlineIndicator />}
        </AvatarContainer>
        {/* <UserName>{userName}</UserName> */}
        <MembershipStatus>{membershipStatus}</MembershipStatus>

        <Stats>
          <StatItem>
            <Dot color={colors.secondary} /> Weight {weight}
          </StatItem>
          <StatItem>
            <Dot color={colors.tertiary} /> Height {height}
          </StatItem>
        </Stats>
      </ProfileSection>

      {/* Navigation Buttons */}
      <NavSection>
        <Link href="/dashboard" passHref>
          {isActive("Dashboard") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>⚡</span> Dashboard
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>⚡</span> Dashboard
            </NavButton>
          )}
        </Link>
        <Link href="/view-insights" passHref>
          {isActive("View Insights") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>📊</span> View Insights
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>📊</span> View Insights
            </NavButton>
          )}
        </Link>
        <Link href="/meal-ai" passHref>
          {isActive("Log Food") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>🍽️</span> Log Food
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>🍽️</span> Log Food
            </NavButton>
          )}
        </Link>
        <Link href="/add-data" passHref>
          {isActive("Track Me") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>📍</span> Track Me
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>📍</span> Track Me
            </NavButton>
          )}
        </Link>
        <Link href="/meal-ideas" passHref>
          {isActive("Get Meal Ideas") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>🍴</span> Get Meal Ideas
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>🍴</span> Get Meal Ideas
            </NavButton>
          )}
        </Link>
        <Link href="/play-eatsmart" passHref>
          {isActive("Play EatSmart") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>🎮</span> Play EatSmart
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>🎮</span> Play EatSmart
            </NavButton>
          )}
        </Link>
        <Link href="/diet-planner" passHref>
          {isActive("Plan Your Diet") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>📅</span> Plan Your Diet
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>📅</span> Plan Your Diet
            </NavButton>
          )}
        </Link>
        <Link href="/meal-blogs" passHref>
          {isActive("Our Blog") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>📝</span> Our Blog
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>📝</span> Our Blog
            </NavButton>
          )}
        </Link>
        <Link href="/profile" passHref>
          {isActive("Profile") ? (
            <ActiveNavButton variant="secondary" size="medium">
              <span>👤</span> Profile
            </ActiveNavButton>
          ) : (
            <NavButton variant="secondary" size="medium">
              <span>👤</span> Profile
            </NavButton>
          )}
        </Link>

        {/* Log Out Button */}
        <LogOutButton variant="secondary" size="medium" onClick={handleLogout}>
          <span>←</span> Log Out
        </LogOutButton>
      </NavSection>
    </SidebarContainer>
  );
}
