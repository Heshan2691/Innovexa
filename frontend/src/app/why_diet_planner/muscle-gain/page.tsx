"use client"
import styled from "styled-components"
import Sidebar from "@/molecules/sidebar"
import Footer from "@/molecules/footer"
import { colors } from "@/styles/colors"
import { fonts } from "@/styles/fonts"
import Image from "next/image"

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
`

const ContentSection = styled.div`
  flex: 1;
  padding: 40px 60px;
  overflow-y: auto;
`

const HeroSection = styled.section`
  background-color: ${colors.brightWhite};
  border-radius: 20px;
  padding: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

const HeroImage = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`

const HeroContent = styled.div`
  margin-left: 30px;
  color: white;
`

const Title = styled.h1`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 64px;
  margin-bottom: 20px;
  color: ${colors.primary};
`


const DietPlanContent = styled.div`
  font-family: ${fonts.poppins.family};
  color: #000000;
`

const SectionTitle = styled.h2`
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 40px;
`

const Paragraph = styled.p`
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
`

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 30px;
`

const ListItem = styled.li`
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
`

const MealPlanSection = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
`

const MealPlanDay = styled.div`
  margin-bottom: 30px;
`

const DayTitle = styled.h3`
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 20px;
  margin-bottom: 15px;
  color: ${colors.secondary};
`

const Meal = styled.div`
  margin-bottom: 15px;
`

const MealTitle = styled.h4`
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 18px;
  margin-bottom: 10px;
`

export default function MuscleGainDietPlan() {
  return (
    <PageWrapper>
      <Sidebar />
      <MainContent>
        <ContentSection>
          <HeroSection>
            <HeroImage>
              <Image
                src="/images/musclegain1.jpg?height=250&width=250"
                alt="Muscle Gain Diet"
                fill
                style={{ objectFit: "cover" }}
              />
            </HeroImage>
            <HeroContent>
              <Title>Muscle Gain Diet Plan</Title>
              
              
            </HeroContent>
          </HeroSection>

          <DietPlanContent>
            <Paragraph>
              Building muscle requires a strategic approach to nutrition that supports muscle protein synthesis while
              providing enough energy for intense workouts. This plan focuses on high-quality proteins, complex
              carbohydrates, and healthy fats distributed throughout the day.
            </Paragraph>

            <SectionTitle>Key Principles</SectionTitle>
            <List>
              <ListItem>
                <strong>Caloric Surplus:</strong> Consume 300-500 calories above your maintenance level to provide
                energy for muscle growth
              </ListItem>
              <ListItem>
                <strong>High Protein Intake:</strong> Aim for 1.6-2.2g of protein per kg of bodyweight daily
              </ListItem>
              <ListItem>
                <strong>Carbohydrate Timing:</strong> Focus on complex carbs before and after workouts
              </ListItem>
              <ListItem>
                <strong>Meal Frequency:</strong> Eat 4-6 meals per day to maintain positive nitrogen balance
              </ListItem>
              <ListItem>
                <strong>Hydration:</strong> Drink at least 3-4 liters of water daily
              </ListItem>
            </List>

            <SectionTitle>Recommended Foods</SectionTitle>

            <MealPlanSection>
              <MealPlanDay>
                <DayTitle>Protein Sources</DayTitle>
                <List>
                  <ListItem>Chicken breast</ListItem>
                  <ListItem>Turkey</ListItem>
                  <ListItem>Lean beef</ListItem>
                  <ListItem>Fish (salmon, tuna, tilapia)</ListItem>
                  <ListItem>Eggs and egg whites</ListItem>
                  <ListItem>Greek yogurt</ListItem>
                  <ListItem>Cottage cheese</ListItem>
                  <ListItem>Whey and casein protein</ListItem>
                  <ListItem>Plant proteins (tofu, tempeh, legumes)</ListItem>
                </List>
              </MealPlanDay>

              <MealPlanDay>
                <DayTitle>Carbohydrate Sources</DayTitle>
                <List>
                  <ListItem>Brown rice</ListItem>
                  <ListItem>Quinoa</ListItem>
                  <ListItem>Sweet potatoes</ListItem>
                  <ListItem>Oats</ListItem>
                  <ListItem>Whole grain pasta</ListItem>
                  <ListItem>Fruits (bananas, berries, apples)</ListItem>
                  <ListItem>Vegetables (all varieties)</ListItem>
                </List>
              </MealPlanDay>

              <MealPlanDay>
                <DayTitle>Healthy Fat Sources</DayTitle>
                <List>
                  <ListItem>Avocados</ListItem>
                  <ListItem>Nuts and nut butters</ListItem>
                  <ListItem>Seeds (chia, flax, hemp)</ListItem>
                  <ListItem>Olive oil</ListItem>
                  <ListItem>Fatty fish</ListItem>
                </List>
              </MealPlanDay>
            </MealPlanSection>

            <SectionTitle>Sample Daily Meal Plan</SectionTitle>

            <MealPlanSection>
              <Meal>
                <MealTitle>Breakfast (7:00 AM)</MealTitle>
                <Paragraph>
                  4 whole eggs + 2 egg whites scrambled with spinach and bell peppers
                  <br />1 cup oatmeal with 1 tablespoon honey and 1 cup berries
                  <br />1 tablespoon almond butter
                </Paragraph>
              </Meal>

              <Meal>
                <MealTitle>Mid-Morning Snack (10:00 AM)</MealTitle>
                <Paragraph>
                  1 cup Greek yogurt
                  <br />1 banana
                  <br />
                  1/4 cup almonds
                </Paragraph>
              </Meal>

              <Meal>
                <MealTitle>Lunch (1:00 PM)</MealTitle>
                <Paragraph>
                  6 oz grilled chicken breast
                  <br />1 cup brown rice
                  <br />2 cups mixed vegetables
                  <br />1 tablespoon olive oil for cooking
                </Paragraph>
              </Meal>

              <Meal>
                <MealTitle>Pre-Workout Snack (4:00 PM)</MealTitle>
                <Paragraph>
                  1 apple
                  <br />2 tablespoons peanut butter
                  <br />1 scoop whey protein with water
                </Paragraph>
              </Meal>

              <Meal>
                <MealTitle>Post-Workout (6:30 PM)</MealTitle>
                <Paragraph>
                  1.5 scoops whey protein with water
                  <br />1 cup pineapple chunks
                </Paragraph>
              </Meal>

              <Meal>
                <MealTitle>Dinner (7:30 PM)</MealTitle>
                <Paragraph>
                  8 oz salmon
                  <br />1 large sweet potato
                  <br />2 cups broccoli
                  <br />
                  1/2 avocado
                </Paragraph>
              </Meal>

              <Meal>
                <MealTitle>Before Bed (10:00 PM)</MealTitle>
                <Paragraph>
                  1 cup cottage cheese
                  <br />1 tablespoon honey
                  <br />1 tablespoon flaxseeds
                </Paragraph>
              </Meal>
            </MealPlanSection>

            <SectionTitle>Supplementation</SectionTitle>
            <Paragraph>
              While whole foods should be your primary source of nutrition, these supplements can be beneficial:
            </Paragraph>
            <List>
              <ListItem>
                <strong>Whey Protein:</strong> For convenient protein intake, especially post-workout
              </ListItem>
              <ListItem>
                <strong>Casein Protein:</strong> Slow-digesting protein ideal before bed
              </ListItem>
              <ListItem>
                <strong>Creatine Monohydrate:</strong> 5g daily to enhance strength and power output
              </ListItem>
              <ListItem>
                <strong>Multivitamin:</strong> To fill potential micronutrient gaps
              </ListItem>
              <ListItem>
                <strong>Fish Oil:</strong> For omega-3 fatty acids that support recovery
              </ListItem>
            </List>

            <SectionTitle>Tips for Success</SectionTitle>
            <List>
              <ListItem>Track your calories and macronutrients using a food diary or app</ListItem>
              <ListItem>Prepare meals in advance to ensure consistency</ListItem>
              <ListItem>
                Adjust calorie intake based on progress - increase if not gaining, decrease if gaining too much fat
              </ListItem>
              <ListItem>Prioritize sleep (7-9 hours) for optimal recovery and hormone production</ListItem>
              <ListItem>Stay consistent with your training program - progressive overload is key</ListItem>
              <ListItem>Reassess your plan every 4-6 weeks and make adjustments as needed</ListItem>
            </List>
          </DietPlanContent>
        </ContentSection>
        <Footer />
      </MainContent>
    </PageWrapper>
  )
}

