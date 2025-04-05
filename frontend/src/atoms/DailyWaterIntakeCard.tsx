// components/DailyWaterIntakeCard.tsx
"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Card = styled.div`
  width: 200px;
  background-color: ${colors.brightWhite};
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const WaterBottle = styled.div`
  width: 40px;
  height: 60px;
  position: relative;
`;

const BottleCap = styled.div`
  width: 20px;
  height: 10px;
  background-color: ${colors.steelGray};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const BottleBody = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${colors.secondary};
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
`;

const BottleLines = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
`;

const BottleLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colors.brightWhite};
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isMinus',
})<{ isMinus?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ isMinus }) => (isMinus ? '#E6F0FA' : colors.secondary)};
  color: ${colors.brightWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ isMinus }) => (isMinus ? '#D1E3F6' : colors.primary)};
  }
`;

const IntakeValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.deepSlate};
`;

const Title = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
  text-align: center;
`;

const DailyWaterIntakeCard: React.FC = () => {
  const [intake, setIntake] = useState(2); // Starting at 2L

  const handleIncrement = () => {
    setIntake((prev) => prev + 0.5); // Increment by 0.5L
  };

  const handleDecrement = () => {
    setIntake((prev) => (prev > 0 ? prev - 0.5 : 0)); // Decrement by 0.5L, minimum 0
  };

  return (
    <Card>
      <IconSection>
        <Button isMinus onClick={handleDecrement}>
          <FaMinus />
        </Button>
        <WaterBottle>
          <BottleCap />
          <BottleBody>
            <BottleLines>
              <BottleLine />
              <BottleLine />
              <BottleLine />
              <BottleLine />
            </BottleLines>
          </BottleBody>
        </WaterBottle>
        <Button onClick={handleIncrement}>
          <FaPlus />
        </Button>
      </IconSection>
      <IntakeValue>{intake}L</IntakeValue>
      <Title>Daily Water Intake</Title>
    </Card>
  );
};

export default DailyWaterIntakeCard;