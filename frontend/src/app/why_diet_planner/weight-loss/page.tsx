"use client"
import styled from "styled-components"
import Sidebar from "@/molecules/sidebar"
import Footer from "@/molecules/footer"
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

// Removed unused HeroSection styled component

const HeroImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 30px;
`

const Title = styled.h1`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 32px;
  color: #000000;
  margin-bottom: 20px;
`

const Subtitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.medium};
  font-size: 18px;
  color:#000000;
  margin-bottom: 30px;
`

const DietPlanContent = styled.div`
  font-family: ${fonts.poppins.family};
  color:#000000;
`

const SectionTitle = styled.h3`
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 20px;
  margin-bottom: 15px;
  margin-top: 30px;
`

const Paragraph = styled.p`
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
`

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
`

const ListItem = styled.li`
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 8px;
`

export default function VeganDietPlan() {
  return (
    <PageWrapper>
      <Sidebar />
      <MainContent>
        <ContentSection>
          <HeroImage>
            <Image
              src="/images/vegan1.jpg?height=300&width=1200"
              alt="Vegan diet foods"
              fill = {true}
              sizes="1400px"
              style={{ objectFit: "cover" }}
            />
          </HeroImage>

          <Title>Weight Loss Diet Plan</Title>
          <Subtitle>Sustainable plant-based nutrition for optimal health and environmental consciousness</Subtitle>

          <DietPlanContent>
            <SectionTitle>Benefits of a Vegan Diet</SectionTitle>
            <Paragraph>
              A well-planned vegan diet provides all the nutrients your body needs while reducing your environmental
              footprint. Research has shown that plant-based diets can help reduce the risk of heart disease, certain
              cancers, and type 2 diabetes.
            </Paragraph>

            <SectionTitle>Daily Meal Structure</SectionTitle>
            <List>
              <ListItem>
                <strong>Breakfast:</strong> Protein-rich smoothie (plant milk, banana, berries, spinach, chia seeds,
                plant protein powder) or overnight oats with nuts and fruits
              </ListItem>
              <ListItem>
                <strong>Mid-morning snack:</strong> Handful of mixed nuts and an apple
              </ListItem>
              <ListItem>
                <strong>Lunch:</strong> Buddha bowl with quinoa, roasted vegetables, chickpeas, avocado, and tahini
                dressing
              </ListItem>
              <ListItem>
                <strong>Afternoon snack:</strong> Hummus with carrot and cucumber sticks
              </ListItem>
              <ListItem>
                <strong>Dinner:</strong> Lentil and vegetable curry with brown rice or stir-fried tofu with vegetables
                and whole grain noodles
              </ListItem>
              <ListItem>
                <strong>Evening (optional):</strong> Herbal tea and a small piece of dark chocolate
              </ListItem>
            </List>

            <SectionTitle>Key Nutrients to Focus On</SectionTitle>
            <Paragraph>When following a vegan diet, pay special attention to these nutrients:</Paragraph>
            <List>
              <ListItem>
                <strong>Protein:</strong> Legumes (beans, lentils, chickpeas), tofu, tempeh, seitan, edamame, and
                plant-based protein powders
              </ListItem>
              <ListItem>
                <strong>Vitamin B12:</strong> Fortified plant milks, nutritional yeast, and supplements
              </ListItem>
              <ListItem>
                <strong>Iron:</strong> Lentils, tofu, tempeh, spinach, and other leafy greens (pair with vitamin C foods
                for better absorption)
              </ListItem>
              <ListItem>
                <strong>Calcium:</strong> Fortified plant milks, tofu made with calcium sulfate, tahini, and leafy
                greens
              </ListItem>
              <ListItem>
                <strong>Omega-3 fatty acids:</strong> Flaxseeds, chia seeds, hemp seeds, and walnuts
              </ListItem>
              <ListItem>
                <strong>Zinc:</strong> Legumes, nuts, seeds, and whole grains
              </ListItem>
              <ListItem>
                <strong>Vitamin D:</strong> Sun exposure, fortified foods, and supplements if needed
              </ListItem>
            </List>

            <SectionTitle>Weekly Meal Prep Tips</SectionTitle>
            <Paragraph>
              Prepare these basics at the beginning of each week to make daily meal assembly quick and easy:
            </Paragraph>
            <List>
              <ListItem>Cook a large batch of grains (quinoa, brown rice, farro)</ListItem>
              <ListItem>Prepare 1-2 types of legumes (chickpeas, black beans, lentils)</ListItem>
              <ListItem>Roast a tray of mixed vegetables</ListItem>
              <ListItem>Make a versatile sauce or dressing (tahini, cashew cream, or herb vinaigrette)</ListItem>
              <ListItem>Cut up raw vegetables for snacking</ListItem>
              <ListItem>Prepare overnight oats in jars for grab-and-go breakfasts</ListItem>
            </List>

            <SectionTitle>Hydration</SectionTitle>
            <Paragraph>
              Aim for 2-3 liters of water daily. Herbal teas, infused water, and moderate amounts of coffee can
              contribute to your fluid intake. Limit fruit juices due to their high sugar content.
            </Paragraph>
          </DietPlanContent>
        </ContentSection>
        <Footer />
      </MainContent>
    </PageWrapper>
  )
}

