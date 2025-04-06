"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"
import Dropdown from "../atoms/Dropdwon"

// Types for dropdown action props
interface DropdownActionProps {
  label: string
  options: string[]
  defaultOption?: string
  icon?: React.ReactNode
  onChange?: (value: string) => void
  width?: string
}

// Styled components for the DropdownAction
const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const ActionLabel = styled.label`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: ${colors.deepSlate};
`

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: ${colors.brightWhite};
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.deepSlate};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.secondary};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    box-shadow: 0 0 0 2px rgba(0, 174, 239, 0.2);
  }
`

const SelectedValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.secondary};
  font-size: 16px;
`

// Fix: Use a transient prop with $ prefix to prevent it from being passed to the DOM
const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  font-size: 14px;
  color: #6B7280;
`

// DropdownAction component
const DropdownAction: React.FC<DropdownActionProps> = ({
  label,
  options,
  defaultOption,
  icon,
  onChange,
  width = "100%",
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || options[0])
  const [isOpen, setIsOpen] = useState(false)

  // Convert options to dropdown items format
  const dropdownItems = options.map((option, index) => ({
    id: index,
    label: option,
    onClick: () => handleOptionSelect(option),
  }))

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    if (onChange) {
      onChange(option)
    }
    setIsOpen(false)
  }

  return (
    <ActionContainer>
      <ActionLabel>{label}</ActionLabel>
      <Dropdown
        trigger={
          <DropdownTrigger onClick={() => setIsOpen(!isOpen)}>
            <SelectedValue>
              {icon && <IconContainer>{icon}</IconContainer>}
              {selectedOption}
            </SelectedValue>
            {/* Fix: Use $isOpen instead of isOpen */}
            <ChevronIcon $isOpen={isOpen}>▼</ChevronIcon>
          </DropdownTrigger>
        }
        items={dropdownItems}
        width={width}
        position="left"
      />
    </ActionContainer>
  )
}

export default DropdownAction

