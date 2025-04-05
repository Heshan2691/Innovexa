// components/TaskProgressCard.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import Button from './Button';

// Styled components for the TaskProgressCard
const CardContainer = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: row; // Changed to row for horizontal alignment
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const TaskText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.deepSlate};
  flex: 1; // Allow text to take available space
`;

const ProgressCircle = styled.div`
  width: 40px; // Reduced size to better fit the design
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(${colors.secondary} 0% 85%, ${colors.steelGray} 85% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px; // Reduced font size for smaller circle
  font-weight: ${fonts.poppins.weights.bold};
  color: ${colors.deepSlate};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 32px; // Adjusted for smaller circle
    height: 32px;
    border-radius: 50%;
    background-color: ${colors.brightWhite};
  }
`;

const ProgressText = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledButton = styled(Button)`
  width: 100px; // Adjusted to fit the design
  height: 32px; // Adjusted to fit the design
  font-size: 12px; // Smaller font size for better fit
`;

// TaskProgressCard component
const TaskProgressCard: React.FC = () => {
  const handleViewTask = () => {
    console.log('View Task clicked');
  };

  return (
    <CardContainer>
      <TaskText>Your today’s task almost done!</TaskText>
      <ProgressCircle>
        <ProgressText>85%</ProgressText>
      </ProgressCircle>
      <StyledButton
        variant="secondary"
        size="medium"
        onClick={handleViewTask}
      >
        View Task
      </StyledButton>
    </CardContainer>
  );
};

export default TaskProgressCard;