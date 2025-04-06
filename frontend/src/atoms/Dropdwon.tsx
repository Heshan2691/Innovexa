"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"

// Types for dropdown props and items
interface DropdownItem {
  id: string | number
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  width?: string
  position?: "left" | "right"
  variant?: "light" | "dark"
  showArrow?: boolean
}

// Styled components for the Dropdown
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownTrigger = styled.div`
  cursor: pointer;
  user-select: none;
`

// Fix: Use transient props with $ prefix to prevent them from being passed to the DOM
const DropdownMenu = styled.div<{
  $isOpen: boolean
  $width: string
  $position: string
  $variant: string
  $showArrow: boolean
}>`
  position: absolute;
  top: calc(100% + 8px);
  ${(props) => (props.$position === "left" ? "left: 0;" : "right: 0;")}
  width: ${(props) => props.$width};
  background-color: ${(props) => (props.$variant === "light" ? colors.brightWhite : colors.primary)};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 100;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform: ${(props) => (props.$isOpen ? "translateY(0)" : "translateY(-10px)")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    ${(props) => (props.$position === "left" ? "left: 16px;" : "right: 16px;")}
    width: 12px;
    height: 12px;
    background-color: ${(props) => (props.$variant === "light" ? colors.brightWhite : colors.primary)};
    transform: rotate(45deg);
    border-radius: 2px;
    display: ${(props) => (props.$showArrow ? "block" : "none")};
  }
`

// Fix: Use transient props with $ prefix
const DropdownItem = styled.div<{ $disabled?: boolean; $variant: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: ${(props) => (props.$variant === "light" ? colors.deepSlate : colors.brightWhite)};
  border-radius: 8px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${(props) =>
      props.$disabled
        ? "transparent"
        : props.$variant === "light"
          ? "rgba(0, 0, 0, 0.05)"
          : "rgba(255, 255, 255, 0.1)"};
  }
`

// Fix: Use transient props with $ prefix
const IconContainer = styled.div<{ $variant: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$variant === "light" ? colors.secondary : colors.secondary)};
  font-size: 16px;
  width: 20px;
  height: 20px;
`

// Fix: Use transient props with $ prefix
const Divider = styled.div<{ $variant: string }>`
  height: 1px;
  width: 100%;
  background-color: ${(props) => (props.$variant === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)")};
  margin: 6px 0;
`

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  width = "200px",
  position = "left",
  variant = "light",
  showArrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick()
      setIsOpen(false)
    }
  }

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownTrigger onClick={toggleDropdown}>{trigger}</DropdownTrigger>
      <DropdownMenu $isOpen={isOpen} $width={width} $position={position} $variant={variant} $showArrow={showArrow}>
        {items.map((item, index) =>
          item.label === "divider" ? (
            <Divider key={`divider-${index}`} $variant={variant} />
          ) : (
            <DropdownItem
              key={item.id}
              $disabled={item.disabled}
              onClick={() => handleItemClick(item)}
              $variant={variant}
            >
              {item.icon && <IconContainer $variant={variant}>{item.icon}</IconContainer>}
              {item.label}
            </DropdownItem>
          ),
        )}
      </DropdownMenu>
    </DropdownContainer>
  )
}

export default Dropdown

