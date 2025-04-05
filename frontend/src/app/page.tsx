// app/page.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import DailyWaterIntakeCard from '../atoms/DailyWaterIntakeCard';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Page() {
  return (
    <PageContainer>
      <DailyWaterIntakeCard />
    </PageContainer>
  );
}