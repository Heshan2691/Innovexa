"use client"
import styled from "styled-components"
import Sidebar from "@/molecules/sidebar"
import Button from "@/atoms/Button"
import { colors } from "@/styles/colors"
import { fonts } from "@/styles/fonts"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

const PageContainer = styled.div`
  display: flex;
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
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

const HeroImage = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 10%;
  overflow: hidden;
  position: relative;
`

const HeroContent = styled.div`
  margin-left: 30px;
`

const Title = styled.h1`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 64px;
  color: ${colors.primary};
  margin-bottom: 10px;
`

// Removed unused Subtitle styled component

const BenefitsSection = styled.section`
  margin-bottom: 40px;
`

const BenefitsTitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;
`

const BenefitsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  color: #000000;
`

const CheckIcon = styled(CheckCircle)`
  color: ${colors.tertiary};
  margin-right: 10px;
  width: 20px;
  height: 20px;
`

const DietPlansSection = styled.section`
  margin-bottom: 40px;
`

const DietPlansTitle = styled.h2`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.semiBold};
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;
`

const DietCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`

const DietCard = styled.div`
  background-color: ${colors.lightBlue};
  border-radius: 15px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`

const DietCardContent = styled.div`
  flex: 1;
`

const DietCardTitle = styled.h3`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.bold};
  font-size: 24px;
  margin-bottom: 15px;
`

const DietCardDescription = styled.p`
  font-family: ${fonts.poppins.family};
  font-weight: ${fonts.poppins.weights.regular};
  font-size: 16px;
  margin-bottom: 20px;
  max-width: 500px;
`

const DietCardImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`

const GoalsSection = styled.section`
  margin-bottom: 40px;
`

const GoalsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

const GoalCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GoalImage = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  margin-bottom: 15px;
`


export default function Home() {
  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <ContentSection>
          <HeroSection>
            <HeroImage>
              <Image
                src="/images/bowl.jpg"
                alt="Healthy meal bowl"
                fill= {true}
                priority={true}
                sizes="(300px)"
                style={{ objectFit: "cover" }}
              />
            </HeroImage>
            <HeroContent>
              <Title>Healthy living Made Easy....!</Title>
             
              
            </HeroContent>
          </HeroSection>

          <BenefitsSection>
            <BenefitsTitle>Why healthy</BenefitsTitle>
            <BenefitsList>
              <BenefitItem>
                <CheckIcon />
                Increased energy levels
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                Better physical health
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                Improved mood
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                Weight management
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                Stronger immune system
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                Increased longevity
              </BenefitItem>
            </BenefitsList>
          </BenefitsSection>

          <DietPlansSection>
            <DietPlansTitle>Find Your Perfect Diet Plan</DietPlansTitle>
            <DietCardContainer>
              <DietCard>
                <DietCardContent>
                  <DietCardTitle>Muscle Gain Diet Plan</DietCardTitle>
                  <DietCardDescription>
                    Designed for individuals who want to build muscle mass through proper nutrition and high-protein
                    intake.
                  </DietCardDescription>
                  <Link href="/why_diet_planner/muscle-gain">
                    <Button variant="secondary" size="small">
                      Read More
                    </Button>
                  </Link>
                </DietCardContent>
                <DietCardImage>
                  <Image
                    src="/images/musclegain.jpg"
                    alt="Muscle Gain Diet"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </DietCardImage>
              </DietCard>

              <DietCard>
                <DietCardContent>
                  <DietCardTitle>Weight Loss Diet Plan</DietCardTitle>
                  <DietCardDescription>
                    A balanced approach to weight loss with nutritious meals that keep you satisfied while creating a
                    calorie deficit.
                  </DietCardDescription>
                  <Link href="/why_diet_planner/weight-loss"></Link>
                  <Button variant="secondary" size="small">
                    Read More
                  </Button>
                </DietCardContent>
                <DietCardImage>
                  <Image
                    src="/images/weightloss.jpg"
                    alt="Weight Loss Diet"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </DietCardImage>
              </DietCard>

              <DietCard>
                <DietCardContent>
                  <DietCardTitle>Vegan / Healthy Lifestyle Diet Plan</DietCardTitle>
                  <DietCardDescription>
                    Plant-based nutrition that provides all essential nutrients while promoting environmental
                    sustainability.
                  </DietCardDescription>
                  <Link href="/why_diet_planner/vegan">
                    <Button variant="secondary" size="small">
                      Read More
                    </Button>
                  </Link>
                </DietCardContent>
                <DietCardImage>
                  <Image
                    src="/images/vegan.jpg"
                    alt="Vegan Diet"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </DietCardImage>
              </DietCard>
            </DietCardContainer>
          </DietPlansSection>

          <GoalsSection>
            <GoalsContainer>
              <GoalCard>
                <GoalImage>
                  <Image
                    src="/images/healthyfoodgoals.png"
                    alt="Healthy food goals"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </GoalImage>
              </GoalCard>
            </GoalsContainer>
          </GoalsSection>
        </ContentSection>
      </MainContent>
    </PageContainer>
  )
}

