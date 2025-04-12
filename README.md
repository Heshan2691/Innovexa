# Innovexa
# FoodLens

FoodLens is a web application designed to help users maintain a healthy lifestyle by providing tools to manage their food-related data. The application features a user-friendly login system, a dashboard for authenticated users, and plans for additional features like food tracking and insights.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
FoodLens allows users to log in, access a dashboard, and manage their food-related data. The application is built with a modern tech stack, ensuring scalability and ease of development. The frontend is deployed on Vercel, and the backend is deployed on Railway, with MongoDB as the database.

Key features:
- User authentication (login system)
- Dashboard for authenticated users
- Redirect to login page on app startup
- Responsive design with styled-components

## Tech Stack

### Frontend
- **Framework**: Next.js (React framework for server-side rendering and static site generation)
- **Language**: TypeScript (for type safety and better developer experience)
- **Styling**: Styled-Components (for CSS-in-JS styling)
- **HTTP Client**: Axios (for making API requests to the backend)
- **Routing**: Next.js App Router (for file-based routing)
- **Deployment**: Vercel (for hosting the frontend)

### Backend
- **Framework**: Express.js (Node.js framework for building RESTful APIs)
- **Language**: JavaScript
- **Database**: MongoDB (NoSQL database for storing user data)
- **Authentication**: JWT (JSON Web Tokens for secure user authentication)
- **Password Hashing**: Bcrypt (for securely hashing passwords)
- **CORS**: Enabled with `cors` middleware to allow cross-origin requests
- **Deployment**: Railway (for hosting the backend and MongoDB)

## Setup Instructions

### Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **MongoDB**: Either install MongoDB locally ([MongoDB Community Server](https://www.mongodb.com/try/download/community)) or use a cloud service like MongoDB Atlas.
- **A GitHub account**: For deployment to Vercel and Railway.
- **Vercel and Railway accounts**: Sign up at [Vercel](https://vercel.com) and [Railway](https://railway.app).

### Backend Setup
The backend is an Express.js application that provides API endpoints for user authentication.

1. **Clone the Backend Repository**:
   ```bash
   git clone https://github.com/yourusername/foodlens-backend.git
   cd foodlens-backend

   Install Dependencies:

   npm install
   
   Start the Backend:

   npm run dev

### Frontend Setup
The frontend is a Next.js application that provides the user interface and interacts with the backend API.

git clone https://github.com/yourusername/foodlens-frontend.git
cd foodlens-frontend

npm install

npm run dev

## Team Members
Heshan Maduwantha Yatigammana
Thishani Nisansala Dissanayake
Sulakshani Dissanayake
Tharindu Mahesh
Surasingha Arachchige Dhanuja
