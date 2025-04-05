// components/TaskProgressCard.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

const Card = styled.div`
  width: 230px;
  height: 100px;
  background-color: ${colors.brightWhite};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: ${colors.deepSlate};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${colors.cloudWhite};
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: 70%; // Example progress
  height: 100%;
  background-color: ${colors.secondary};
  border-radius: 5px;
`;

const ProgressText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: ${colors.steelGray};
  text-align: right;
`;

const TaskProgressCard: React.FC = () => {
  return (
    <Card>
      <Title>Daily Task Progress</Title>
      <ProgressBar>
        <Progress />
      </ProgressBar>
      <ProgressText>70% Completed</ProgressText>
    </Card>
  );
};

export default TaskProgressCard;