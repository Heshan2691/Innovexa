"use client";

import type React from "react";

import { useState, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { fonts } from "../styles/fonts"
import Image from "next/image"
import { ArrowLeft, Star } from "lucide-react"
import { useRouter } from "next/navigation"


// Types for our game
interface FoodItem {
  id: string;
  name: string;
  calories: number;
  image: string;
  isHealthy: boolean;
  category: "protein" | "carbs" | "vegetables" | "junk" | "fruit";
}

interface SelectedFood {
  id: string;
  name: string;
  calories: number;
  isHealthy: boolean;
}

// Styled components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GameHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: ${colors.primary};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 20px;
`;

const LogoImage = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
`;

const LogoText = styled.span`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 16px;
  color: ${colors.primary};
`;

const PageTitle = styled.h1`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 20px;
  color: ${colors.deepSlate};
  flex: 1;
  text-align: center;
`;

const GameContainer = styled.div`
  display: flex;
  padding: 40px;
  gap: 20px;
  flex: 1;
`;

const GamePanel = styled.div`
  flex: 3;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const InstructionBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  gap: 20px;
`;

const InstructionText = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  color: ${colors.deepSlate};
  flex: 1;
`;

const InstructionImage = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const FoodCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const FoodImage = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 12px;
`;

const FoodName = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: ${colors.deepSlate};
  margin-bottom: 8px;
  text-align: center;
`;

const SelectButton = styled.button`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primary};
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const GameButton = styled.button`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: center;
  margin-top: 20px;

  &:hover {
    background-color: ${colors.primary};
  }
`;

const MealsPanel = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PanelTitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 18px;
  color: ${colors.deepSlate};
  margin-bottom: 20px;
`;

const EmptyState = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 14px;
  color: #9ca3af;
  text-align: center;
  margin-top: 40px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MealsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  flex: 1;
`;

const MealItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
`;

const MealImage = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

const MealInfo = styled.div`
  flex: 1;
`;

const MealName = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: ${colors.deepSlate};
`;

const CalorieInfo = styled.div`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 12px;
  color: #6b7280;
`;

const TotalCalories = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid #e5e7eb;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 16px;
  color: ${colors.deepSlate};
  margin-top: auto;
`;

// Result card styles
const ResultOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ResultCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ResultImage = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 20px;
`;

const ResultTitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  color: ${colors.primary};
  margin-bottom: 12px;
`;

const ResultText = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: ${colors.deepSlate};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const StarRating = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const ResultButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 12px;

  &:hover {
    background-color: ${colors.tertiary};
  }
`;

const BackLink = styled.button`
  background: none;
  border: none;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// All available food items database
const allFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Veggie Salad",
    calories: 250,
    image: "/images/veggie-salad.jpg",
    isHealthy: true,
    category: "vegetables",
  },
  {
    id: "2",
    name: "Pork Salad",
    calories: 450,
    image: "/images/pork-salad.jpg",
    isHealthy: true,
    category: "protein",
  },
  {
    id: "3",
    name: "Pasta with Chicken",
    calories: 650,
    image: "/images/pasta-chicken.jpg",
    isHealthy: false,
    category: "carbs",
  },
  {
    id: "4",
    name: "Cheese Pizza",
    calories: 900,
    image: "/images/cheese-pizza.jpg",
    isHealthy: false,
    category: "junk",
  },
  {
    id: "5",
    name: "Greek Yogurt",
    calories: 150,
    image: "/images/greek-yogurt.jpg",
    isHealthy: true,
    category: "protein",
  },
  {
    id: "6",
    name: "Avocado Toast",
    calories: 350,
    image: "/images/avocado-toast.jpg",
    isHealthy: true,
    category: "carbs",
  },
  {
    id: "7",
    name: "Cheeseburger",
    calories: 800,
    image: "/images/cheeseburger.jpg",
    isHealthy: false,
    category: "junk",
  },
  {
    id: "8",
    name: "Fruit Bowl",
    calories: 200,
    image: "/images/fruit-bowl.jpg",
    isHealthy: true,
    category: "fruit",
  },
  {
    id: "9",
    name: "Grilled Salmon",
    calories: 350,
    image: "/images/grilled-salmon.jpg",
    isHealthy: true,
    category: "protein",
  },
  {
    id: "10",
    name: "French Fries",
    calories: 450,
    image: "/images/french-fries.jpg",
    isHealthy: false,
    category: "junk",
  },
  {
    id: "11",
    name: "Quinoa Bowl",
    calories: 400,
    image: "/images/quinoa-bowl.jpg",
    isHealthy: true,
    category: "carbs",
  },
  {
    id: "12",
    name: "Ice Cream",
    calories: 550,
    image: "/images/ice-cream.jpg",
    isHealthy: false,
    category: "junk",
  },
];

const EatSmartGame: React.FC = () => {
  const router = useRouter();
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [gameState, setGameState] = useState<
    "start" | "selecting" | "result" | "success" | "failure"
  >("start");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [gameScore, setGameScore] = useState(0);

  // Generate a random set of food items for each game
  useEffect(() => {
    if (gameState === "start" || gameState === "selecting") {
      // Shuffle and pick 4 random food items
      const shuffled = [...allFoodItems].sort(() => 0.5 - Math.random());
      setFoodItems(shuffled.slice(0, 4));
    }
  }, [gameState]);

  const handleSelectFood = (food: FoodItem) => {
    // Check if food is already selected
    if (selectedFoods.some((item) => item.id === food.id)) {
      // Remove it
      setSelectedFoods(selectedFoods.filter((item) => item.id !== food.id));
    } else {
      // Add it
      setSelectedFoods([
        ...selectedFoods,
        {
          id: food.id,
          name: food.name,
          calories: food.calories,
          isHealthy: food.isHealthy,
        },
      ]);
    }
  };

  const isFoodSelected = (foodId: string) => {
    return selectedFoods.some((item) => item.id === foodId);
  };

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + food.calories,
    0
  );

  const handleStartGame = () => {
    setGameState("selecting");
    setSelectedFoods([]);
  };

  const handleContinue = () => {
    if (selectedFoods.length > 0) {
      // Evaluate the user's choices
      evaluateChoices();
    }
  };

  const evaluateChoices = () => {
    // Calculate score based on healthy choices and total calories
    let healthyCount = 0;
    let unhealthyCount = 0;

    selectedFoods.forEach((food) => {
      if (food.isHealthy) {
        healthyCount++;
      } else {
        unhealthyCount++;
      }
    });

    // Calculate score (0-5)
    let score = 0;

    // More healthy than unhealthy foods
    if (healthyCount > unhealthyCount) {
      score += 2;
    }

    // All healthy foods
    if (unhealthyCount === 0 && healthyCount > 0) {
      score += 1;
    }

    // Reasonable calorie count (under 1000)
    if (totalCalories < 1000) {
      score += 2;
    } else if (totalCalories < 1500) {
      score += 1;
    }

    setGameScore(score);

    // Determine if the user won or lost
    if (score >= 3) {
      setGameState("success");
    } else {
      setGameState("failure");
    }
  };

  const handleNewGame = () => {
    setGameState("start");
    setSelectedFoods([]);
  };

  const handleTryAgain = () => {
    setGameState("selecting");
    setSelectedFoods([]);
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  // Render star rating based on score
  const renderStars = (score: number, max = 5) => {
    return Array.from({ length: max }).map((_, index) => (
      <Star
        key={index}
        size={24}
        fill={index < score ? colors.primary : "none"}
        stroke={index < score ? colors.primary : "#d1d5db"}
      />
    ));
  };

  return (
    <PageContainer>
      <MainContent>
        <GameHeader>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={24} />
          </BackButton>
          <Logo>
            <LogoImage>
              <Image src="/logo1.png" alt="Food Lens Logo" fill />
            </LogoImage>
            <LogoText>FOOD LENS</LogoText>
          </Logo>
          <PageTitle>EatSmart Game</PageTitle>
        </GameHeader>

        <GameContainer>
          <GamePanel>
            <InstructionBox>
              <InstructionText>
                Choose the finest and healthiest meals from our vibrant menu to
                nourish your body!
              </InstructionText>
              <InstructionImage>
                <Image
                  src="/images/healthy-plate.jpg"
                  alt="Healthy Food"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </InstructionImage>
            </InstructionBox>

            <FoodGrid>
              {foodItems.map((food) => (
                <FoodCard key={food.id}>
                  <FoodImage>
                    <Image
                      src={food.image || "/placeholder.svg"}
                      alt={food.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </FoodImage>
                  <FoodName>{food.name}</FoodName>
                  <SelectButton
                    onClick={() => handleSelectFood(food)}
                    disabled={gameState === "start"}
                  >
                    {isFoodSelected(food.id) ? "Selected" : "Select"}
                  </SelectButton>
                </FoodCard>
              ))}
            </FoodGrid>

            {gameState === "start" && (
              <GameButton onClick={handleStartGame}>Start Game</GameButton>
            )}

            {gameState === "selecting" && (
              <GameButton onClick={handleContinue}>Continue</GameButton>
            )}
          </GamePanel>

          <MealsPanel>
            <PanelTitle>Your Meals List</PanelTitle>

            {selectedFoods.length === 0 ? (
              <EmptyState>
                {gameState === "start"
                  ? "Start the game to select meals"
                  : "still haven't add anything"}
              </EmptyState>
            ) : (
              <>
                <MealsList>
                  {selectedFoods.map((food) => (
                    <MealItem key={food.id}>
                      <MealImage>
                        <Image
                          src={
                            foodItems.find((item) => item.id === food.id)
                              ?.image || ""
                          }
                          alt={food.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </MealImage>
                      <MealInfo>
                        <MealName>{food.name}</MealName>
                      </MealInfo>
                      <CalorieInfo>{food.calories}</CalorieInfo>
                    </MealItem>
                  ))}
                </MealsList>

                <TotalCalories>
                  <span>Total calories</span>
                  <span>{totalCalories}</span>
                </TotalCalories>
              </>
            )}
          </MealsPanel>
        </GameContainer>

        
      </MainContent>

      {/* Success Result Modal */}
      {gameState === "success" && (
        <ResultOverlay>
          <ResultCard>
            <ResultImage>
              <Image
                src="/images/Congratulations.jpg"
                alt="Success"
                fill
                style={{ objectFit: "contain" }}
              />
            </ResultImage>
            <ResultTitle>Congratulations!</ResultTitle>
            <ResultText>
              Enjoy guilt-free dining with our low calorie, free foods!
            </ResultText>
            <StarRating>{renderStars(gameScore)}</StarRating>
            <ResultButton onClick={handleNewGame}>Next</ResultButton>
            <BackLink onClick={handleBack}>Back</BackLink>
          </ResultCard>
        </ResultOverlay>
      )}

      {/* Failure Result Modal */}
      {gameState === "failure" && (
        <ResultOverlay>
          <ResultCard>
            <ResultImage>
              <Image
                src="/images/try.jpg"
                alt="Try Again"
                fill
                style={{ objectFit: "contain" }}
              />
            </ResultImage>
            <ResultTitle>We are sorry!</ResultTitle>
            <ResultText>
              Let&#39;s try again—you&#39;ve picked foods packed with calories!
            </ResultText>
            <StarRating>{renderStars(gameScore)}</StarRating>
            <ResultButton onClick={handleTryAgain}>Try Again</ResultButton>
            <BackLink onClick={handleBack}>Back</BackLink>
          </ResultCard>
        </ResultOverlay>
      )}
    </PageContainer>
  );
};

export default EatSmartGame;
