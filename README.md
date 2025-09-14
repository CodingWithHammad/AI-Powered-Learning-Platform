# 🔥 AI-Powered Learning Platform

A modern, full-stack learning platform that leverages AI to provide personalized programming education through dynamic quizzes and learning roadmaps.

## ✨ Features

### 🔐 Authentication
- **Clerk Integration**: Seamless sign up, login, logout, and profile management
- **Secure Sessions**: Protected routes and user-specific content

### 🏠 Pages & Functionality

#### **Home Page**
- Hero section with compelling call-to-action
- About section introducing the platform
- Interactive workflow section explaining how to use the platform
- FAQ section with accordion-style answers
- Professional footer with links and copyright

#### **About Page**
- Detailed information about the project and mission
- Statistics and platform highlights
- Visual elements and professional design

#### **Contact Page**
- Comprehensive contact form with fields:
  - Name, Age, Subject, Description, Email
- Form submissions sent directly to: `codingwithhammad786@gmail.com`
- Real-time validation and success feedback

#### **Courses Page (AI-Powered Quizzes)**
- 10 programming language options with interactive logos
- AI-generated quizzes using Google's Gemini AI
- Each quiz session generates unique questions
- Real-time scoring and detailed review system
- Quiz results saved to database for progress tracking

#### **Roadmap Page (AI-Powered Learning Paths)**
- Interactive programming language selection
- AI-generated step-by-step learning roadmaps
- Tree structure format with expandable phases
- Beginner to Expert progression paths
- Visual timeline with progress indicators

#### **Score Page**
- Comprehensive leaderboard showing all user quiz scores
- Personal statistics dashboard
- Filtering by programming language
- Search functionality for users and languages
- Performance badges and achievements

## 🚀 Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase with PostgreSQL
- **AI Integration**: Google Gemini AI
- **Email Service**: EmailJS
- **Routing**: React Router
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd ai-learning-platform
npm install
```

### 2. Environment Variables
Create a `.env` file based on `.env.example`:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Supabase Setup
1. Create a new Supabase project
2. Run the migration file to create the quiz_scores table
3. Add your Supabase URL and anon key to the `.env` file

### 4. Clerk Setup
1. Create a Clerk account and application
2. Add your publishable key to the `.env` file
3. Configure redirect URLs in Clerk dashboard

### 5. Google Gemini AI Setup
1. Get a Gemini API key from Google AI Studio
2. Add the API key to your `.env` file

### 6. EmailJS Setup
1. Create an EmailJS account
2. Set up a service and email template
3. Add the service ID, template ID, and public key to your `.env` file

## 🎯 Key Features

### AI-Generated Content
- **Dynamic Quizzes**: Each quiz attempt generates completely new questions
- **Smart Roadmaps**: Personalized learning paths based on current industry standards
- **Adaptive Difficulty**: Content adjusts based on programming language complexity

### User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Modern, eye-friendly interface with purple/pink gradient accents
- **Smooth Animations**: Micro-interactions and hover effects throughout
- **Progress Tracking**: Comprehensive scoring and achievement system

### Security & Performance
- **Row Level Security**: Database policies ensure data privacy
- **Authenticated Routes**: Protected content for signed-in users only
- **Optimized Loading**: Efficient data fetching and caching strategies

## 📱 Supported Programming Languages

1. JavaScript
2. Python
3. Java
4. C++
5. C#
6. Go
7. Rust
8. PHP
9. Swift
10. Kotlin

## 🏆 Quiz System

- **10 Questions** per quiz session
- **4 Multiple Choice Options** per question
- **15 Minutes** time limit
- **Detailed Explanations** for each answer
- **Progress Tracking** across all attempts
- **Leaderboard** system for competition

## 🗺️ Learning Roadmaps

- **4 Learning Phases**: Beginner → Intermediate → Advanced → Expert
- **Structured Topics**: Each phase contains 3-5 main topics
- **Subtopic Breakdown**: Detailed learning objectives
- **Time Estimates**: Realistic duration expectations
- **Visual Timeline**: Interactive progress visualization

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📧 Contact

For questions or support, reach out via the contact form on the platform or email directly: `codingwithhammad786@gmail.com`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ and AI-powered innovation**