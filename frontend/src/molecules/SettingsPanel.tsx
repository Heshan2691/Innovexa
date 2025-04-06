"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import DropdownAction from "./DropdownAction"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Types for settings panel props
interface SettingsPanelProps {
  title: string
  description?: string
  onSave?: (settings: Record<string, string>) => void
}

// Styled components for the SettingsPanel
const PanelContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  width: 100%;
  max-width: 800px;
`

const PanelHeader = styled.div`
  margin-bottom: 24px;
`

const PanelTitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 20px;
  color: ${colors.deepSlate};
  margin-bottom: 8px;
`

const PanelDescription = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #6B7280;
`

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

const SaveButton = styled.button`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colors.primary};
  }
`

const CancelButton = styled.button`
  background-color: transparent;
  color: ${colors.deepSlate};
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }
`

// SettingsPanel component
const SettingsPanel: React.FC<SettingsPanelProps> = ({ title, description, onSave }) => {
  // State to track selected values
  const [settings, setSettings] = useState({
    weightTarget: "Lose 5 lbs",
    activityLevel: "Moderate",
    dietaryGoal: "Weight Loss",
    mealFrequency: "3 meals",
    dietaryRestrictions: "None",
    viewRecent: "Recent logs",
  })

  // Handle setting changes
  const handleSettingChange = (setting: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Handle save button click
  const handleSave = () => {
    if (onSave) {
      onSave(settings)
    }
  }

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>{title}</PanelTitle>
        {description && <PanelDescription>{description}</PanelDescription>}
      </PanelHeader>

      <SettingsGrid>
        <DropdownAction
          label="Weight Target"
          options={["Lose 5 lbs", "Lose 2 lbs", "Maintain", "Gain 2 lbs", "Gain 5 lbs"]}
          defaultOption={settings.weightTarget}
          icon="⚖️"
          onChange={(value) => handleSettingChange("weightTarget", value)}
        />

        <DropdownAction
          label="Activity Level"
          options={["Sedentary", "Light", "Moderate", "Active", "Very Active"]}
          defaultOption={settings.activityLevel}
          icon="🏃"
          onChange={(value) => handleSettingChange("activityLevel", value)}
        />

        <DropdownAction
          label="Dietary Goal"
          options={["Weight Loss", "Muscle Gain", "Maintenance", "General Health"]}
          defaultOption={settings.dietaryGoal}
          icon="🎯"
          onChange={(value) => handleSettingChange("dietaryGoal", value)}
        />

        <DropdownAction
          label="Meal Frequency"
          options={["3 meals", "5 meals (3 + 2 snacks)", "Custom"]}
          defaultOption={settings.mealFrequency}
          icon="🍽️"
          onChange={(value) => handleSettingChange("mealFrequency", value)}
        />

        <DropdownAction
          label="Dietary Restrictions"
          options={["None", "Vegan", "Vegetarian", "Gluten-Free", "Low Carb", "Keto"]}
          defaultOption={settings.dietaryRestrictions}
          icon="🥗"
          onChange={(value) => handleSettingChange("dietaryRestrictions", value)}
        />

        <DropdownAction
          label="View Recent & Favorites"
          options={["Recent logs", "Favorites", "All items"]}
          defaultOption={settings.viewRecent}
          icon="📋"
          onChange={(value) => handleSettingChange("viewRecent", value)}
        />
      </SettingsGrid>

      <ButtonContainer>
        <CancelButton>Cancel</CancelButton>
        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ButtonContainer>
    </PanelContainer>
  )
}

export default SettingsPanel

