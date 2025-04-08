"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

// Styled components for the BMI calculator
const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.cloudWhite};
  border-radius: 16px;
  border: 1px dashed #d0d5dd;
  padding: 24px;
  width: 100%;
  max-width: 360px;
`;

const InputSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const InputCard = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const InputLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.steelGray};
  margin-bottom: 8px;
`;

const InputValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 32px;
  color: ${colors.secondary};
  text-align: center;
  margin-bottom: 12px;
`;

const InputControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ControlButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #f2f4f7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${colors.steelGray};
  cursor: pointer;

  &:hover {
    background-color: #e4e7ec;
  }
`;

const HeightSection = styled.div`
  background-color: ${colors.brightWhite};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const SliderContainer = styled.div`
  margin-top: 16px;
  position: relative;
`;

const SliderPointer = styled.div<{ position: number }>`
  position: absolute;
  top: -10px;
  left: ${(props) => props.position}%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${colors.secondary};
`;

const ResultSection = styled.div`
  margin-top: 24px;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.steelGray};
  font-size: 20px;
`;

const ResultTitle = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  color: ${colors.deepSlate};
  flex-grow: 1;
  text-align: center;
`;

const BMIValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 32px;
  color: ${colors.tertiary};
  text-align: center;
  margin-bottom: 16px;
`;

const BMIScale = styled.div`
  height: 8px;
  background: linear-gradient(
    90deg,
    ${colors.tertiary} 0%,
    ${colors.tertiary} 33%,
    #facc15 33%,
    #facc15 66%,
    #ef4444 66%,
    #ef4444 100%
  );
  border-radius: 4px;
  margin-bottom: 24px;
  position: relative;
`;

const BMIIndicator = styled.div<{ position: number }>`
  position: absolute;
  top: -4px;
  left: ${(props) => props.position}%;
  width: 16px;
  height: 16px;
  background-color: ${colors.tertiary};
  border-radius: 50%;
  transform: translateX(-50%);
`;

const BMISummary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 24px;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryValue = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 16px;
  color: ${colors.deepSlate};
`;

const SummaryLabel = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: ${colors.steelGray};
`;

const HealthyWeightText = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: ${colors.deepSlate};
  margin-bottom: 8px;
`;

const HealthyWeightRange = styled.span`
  font-weight: ${fonts.poppins.weights.semiBold};
  color: ${colors.tertiary};
`;

const BMIExplanation = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: ${colors.steelGray};
  line-height: 1.5;
`;

const BMICategory = styled.div`
  display: inline-block;
  background-color: rgba(71, 184, 129, 0.1); /* Tertiary color with opacity */
  color: ${colors.tertiary};
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

// Styled Button for custom styles
const StyledButton = styled(Button)`
  align-self: center;
  width: 100%;
  background: ${colors.secondary};
  border-color: ${colors.secondary};
`;

// Define the props interface for BMICalculator
interface BMICalculatorProps {
  onBmiCalculated?: (bmi: number) => void; // Optional callback to send BMI to parent
}

// BMI Calculator Component
const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(26);
  const [height, setHeight] = useState(170);
  const [gender] = useState<"male" | "female">("male");
  const [showResult, setShowResult] = useState(false);
  const [bmi, setBmi] = useState(0);

  // Calculate BMI when inputs change
  useEffect(() => {
    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(Number.parseFloat(calculatedBmi.toFixed(1)));
  }, [weight, height]);

  // Calculate healthy weight range
  const calculateHealthyWeightRange = () => {
    // BMI range for normal weight is 18.5-24.9
    const minWeight = (18.5 * (height / 100) * (height / 100)).toFixed(1);
    const maxWeight = (24.9 * (height / 100) * (height / 100)).toFixed(1);
    return `${minWeight} - ${maxWeight} kg`;
  };

  // Get BMI category
  const getBmiCategory = () => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  // Get BMI category color
  const getBmiColor = () => {
    if (bmi < 18.5) return "#FACC15"; // Yellow for underweight
    if (bmi < 25) return colors.tertiary; // Green for normal
    if (bmi < 30) return "#FACC15"; // Yellow for overweight
    return "#EF4444"; // Red for obese
  };

  // Calculate BMI scale position (0-100%)
  const getBmiPosition = () => {
    if (bmi < 15) return 0;
    if (bmi > 35) return 100;
    // Map BMI 15-35 to 0-100%
    return ((bmi - 15) / 20) * 100;
  };

  // Handle increment/decrement
  const incrementWeight = () => setWeight((prev) => prev + 1);
  const decrementWeight = () => setWeight((prev) => (prev > 1 ? prev - 1 : 1));
  const incrementAge = () => setAge((prev) => prev + 1);
  const decrementAge = () => setAge((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle height slider change
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number.parseInt(e.target.value));
  };

  // Calculate slider pointer position
  const getSliderPosition = () => {
    // Map height 100-220 to 0-100%
    return ((height - 100) / 120) * 100;
  };

  // Handle Find My BMI button click
  const handleCalculate = () => {
    setShowResult(true);
    if (onBmiCalculated) onBmiCalculated(bmi);
  };

  // Handle back button click
  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <CalculatorContainer>
      {!showResult ? (
        <>
          <InputSection>
            <InputCard>
              <InputLabel>Weight (kg)</InputLabel>
              <InputValue>{weight}</InputValue>
              <InputControls>
                <ControlButton onClick={decrementWeight}>−</ControlButton>
                <ControlButton onClick={incrementWeight}>+</ControlButton>
              </InputControls>
            </InputCard>
            <InputCard>
              <InputLabel>Age</InputLabel>
              <InputValue>{age}</InputValue>
              <InputControls>
                <ControlButton onClick={decrementAge}>−</ControlButton>
                <ControlButton onClick={incrementAge}>+</ControlButton>
              </InputControls>
            </InputCard>
          </InputSection>

          <HeightSection>
            <InputLabel>Height (cm)</InputLabel>
            <InputValue>{height}</InputValue>
            <SliderContainer>
              <input
                type="range"
                min="100"
                max="220"
                value={height}
                onChange={handleHeightChange}
                style={{
                  width: "100%",
                  height: "2px",
                  appearance: "none",
                  background: "#D0D5DD",
                  outline: "none",
                }}
              />
              <SliderPointer position={getSliderPosition()} />
            </SliderContainer>
          </HeightSection>

          {/* Removed the duplicate button, keeping only one */}
          <StyledButton
            variant="primary"
            size="medium"
            onClick={handleCalculate}
          >
            Find My BMI
          </StyledButton>
        </>
      ) : (
        <ResultSection>
          <ResultHeader>
            <BackButton onClick={handleBack}>←</BackButton>
            <ResultTitle>Your BMI</ResultTitle>
          </ResultHeader>

          <BMIValue style={{ color: getBmiColor() }}>{bmi}</BMIValue>
          <BMICategory>{getBmiCategory()}</BMICategory>

          <BMIScale>
            <BMIIndicator
              position={getBmiPosition()}
              style={{ backgroundColor: getBmiColor() }}
            />
          </BMIScale>

          <BMISummary>
            <SummaryItem>
              <SummaryValue>{weight}</SummaryValue>
              <SummaryLabel>weight</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{height}</SummaryValue>
              <SummaryLabel>height</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{age}</SummaryValue>
              <SummaryLabel>age</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{gender}</SummaryValue>
              <SummaryLabel>gender</SummaryLabel>
            </SummaryItem>
          </BMISummary>

          <HealthyWeightText>
            Healthy weight for the height:{" "}
            <HealthyWeightRange>
              {calculateHealthyWeightRange()}
            </HealthyWeightRange>
          </HealthyWeightText>

          <BMIExplanation>
            Your BMI is {bmi}, indicating your weight is in the{" "}
            {getBmiCategory().toLowerCase()} category for adults of your height.
            <br />
            <br />
            For your height, a normal weight range would be{" "}
            {calculateHealthyWeightRange()}.
            <br />
            <br />
            Maintaining a healthy weight may reduce the risk of chronic diseases
            associated with overweight and obesity.
          </BMIExplanation>
        </ResultSection>
      )}
    </CalculatorContainer>
  );
};

export default BMICalculator;
