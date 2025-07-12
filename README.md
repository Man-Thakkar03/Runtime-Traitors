<<<<<<< HEAD
# Runtime-Traitors
=======
# Runtime-Traitors

Problem Statement : StackIt – A Minimal Q&A Forum Platform

Team Members  :
1 ) Man Thakkar 
    Email : manthakkar2005@gmail.com

2 ) Meet Patel
    Email : meetpatelyt007@gmail.com

3 ) Yashvi Jasani 
    Email : yashvijasani02@gmail.com

3 ) Sneh Gohel
    Email : snehgohel51@gmail.com

# 🚀 Runtime Traitors - Community Platform

A modern, full-stack community platform with separate Admin and User interfaces built with React, Next.js, and modern web technologies.

![Platform Preview](User/public/image.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Localhost Setup](#localhost-setup)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

Runtime Traitors is a comprehensive community platform that consists of two main applications:

1. **User Frontend** - A Next.js application for community members
2. **Admin Frontend** - A React/Vite application for platform administrators

The platform provides features like real-time collaboration, notification management, interactive polls, community forums, and comprehensive admin tools.

## 🏗 Architecture

```
Frontend/
├── Admin/          # React + Vite Admin Panel
│   ├── src/
│   │   ├── Components/
│   │   ├── pages/
│   │   └── main.jsx
│   └── package.json
└── User/           # Next.js User Application
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    └── package.json
```

## ✨ Features

### User Frontend Features
- 🔐 **Authentication** - Clerk-powered user authentication
- 📊 **Dashboard** - Interactive dashboard with analytics
- 📝 **Q&A System** - Community questions and answers
- 📊 **Interactive Polls** - Real-time voting and results
- 🔔 **Notifications** - Comprehensive notification system
- ⚙️ **Settings** - User preferences and account management
- 📱 **Responsive Design** - Mobile-first approach

### Admin Frontend Features
- 👥 **User Management** - View and manage all users
- ❓ **Question Moderation** - Moderate community questions
- 💬 **Answer Management** - Review and manage answers
- 🛡️ **Content Moderation** - Comprehensive moderation tools
- 📈 **Analytics Dashboard** - Platform insights and metrics
- 🎨 **Modern UI** - Dark theme with purple/blue gradients

## 🛠 Tech Stack

### User Frontend (Next.js)
- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **UI Components**: Radix UI
- **Database**: Prisma
- **Charts**: Recharts
- **Animations**: Framer Motion

### Admin Frontend (React)
- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: React Icons
- **UI**: Custom components

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd Frontend
```

2. **Install User Frontend dependencies**
```bash
cd User
npm install
```

3. **Install Admin Frontend dependencies**
```bash
cd ../Admin
npm install
```

## 🌐 Localhost Setup

### User Frontend (Next.js)
```bash
cd User
npm run dev
```
**URL**: http://localhost:3000

### Admin Frontend (React/Vite)
```bash
cd Admin
npm run dev
```
**URL**: http://localhost:5173

### Running Both Applications

1. **Terminal 1 - User Frontend:**
```bash
cd User
npm run dev
```

2. **Terminal 2 - Admin Frontend:**
```bash
cd Admin
npm run dev
```

3. **Access the applications:**
   - User Frontend: http://localhost:3000
   - Admin Frontend: http://localhost:5173

## 📁 Project Structure

```
Frontend/
├── Admin/                          # Admin Panel
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AdminLayout.jsx    # Main layout component
│   │   │   └── AdminSidebar.jsx   # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Analytics dashboard
│   │   │   ├── UsersPage.jsx      # User management
│   │   │   ├── QuestionsPage.jsx  # Question moderation
│   │   │   ├── AnswersPage.jsx    # Answer management
│   │   │   └── ModerationPage.jsx # Content moderation
│   │   ├── main.jsx               # App entry point
│   │   └── App.jsx                # Main app component
│   ├── package.json
│   └── README.md
└── User/                          # User Application
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/            # Authentication pages
    │   │   ├── (protected)/       # Protected dashboard
    │   │   │   └── dashboard/
    │   │   │       ├── page.tsx   # Main dashboard
    │   │   │       ├── qa/        # Q&A system
    │   │   │       ├── polls/     # Polls feature
    │   │   │       ├── notifications/ # Notifications
    │   │   │       └── settings/  # User settings
    │   │   └── (website)/         # Public pages
    │   ├── components/
    │   │   ├── global/            # Global components
    │   │   └── ui/                # UI components
    │   └── lib/                   # Utilities
    ├── public/
    │   └── image.png              # Platform preview
    └── package.json
```

## 📸 Screenshots

![admin1](https://github.com/user-attachments/assets/e143d1d7-aaa2-460d-9fc7-9e5cb5e75770)
![admin2](https://github.com/user-attachments/assets/8197c94f-f9a2-49e3-bf2c-ef74cb264776)
![admin3](https://github.com/user-attachments/assets/dfa26ffe-6ec7-4d68-a882-b8ecfa575874)
![admin4](https://github.com/user-attachments/assets/e03465e1-21fe-427a-a05e-a909da6f1a83)
![user-dashboard](https://github.com/user-attachments/assets/b9f2e6a4-0216-4ffc-a976-1d6952453222)
![user2](https://github.com/user-attachments/assets/9dd3b32d-038a-4783-a209-bef5f387dbb8)
![user2](https://github.com/user-attachments/assets/7db2234a-fc2f-496d-bfb8-cd9334e49e8e)







### User Frontend - Dashboard
- **URL**: http://localhost:3000/dashboard
- **Features**: Analytics, Q&A, Polls, Notifications

### Admin Frontend - Dashboard
- **URL**: http://localhost:5173/admin/dashboard
- **Features**: User management, content moderation, analytics

### Admin Frontend - User Management
- **URL**: http://localhost:5173/admin/users
- **Features**: View all users, manage permissions

### Admin Frontend - Question Moderation
- **URL**: http://localhost:5173/admin/questions
- **Features**: Review and moderate community questions

### Admin Frontend - Answer Management
- **URL**: http://localhost:5173/admin/answers
- **Features**: Manage and moderate user answers

## 🔧 Development

### User Frontend Development
```bash
cd User
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Admin Frontend Development
```bash
cd Admin
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Key Development Features

#### User Frontend
- **Hot Reload**: Automatic page refresh on changes
- **TypeScript**: Full type safety
- **Clerk Auth**: Built-in authentication
- **Responsive**: Mobile-first design
- **Dark Theme**: Modern dark UI

#### Admin Frontend
- **Vite**: Fast development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization
- **Mobile Responsive**: Works on all devices

## 🚀 Deployment

### User Frontend (Next.js)
```bash
cd User
npm run build
npm run start
```

### Admin Frontend (Vite)
```bash
cd Admin
npm run build
npm run preview
```

### Environment Variables

#### User Frontend (.env.local)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
DATABASE_URL=your_database_url
```

#### Admin Frontend
No environment variables required for basic setup.

## 📊 Performance

### User Frontend
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Next.js
- **Loading Speed**: < 2s initial load
- **Mobile Performance**: Optimized for mobile devices

### Admin Frontend
- **Build Time**: < 30s
- **Bundle Size**: < 500KB
- **Loading Speed**: < 1s initial load
- **Responsive**: Works on all screen sizes

## 🔒 Security

- **Authentication**: Clerk-powered secure authentication
- **Authorization**: Protected routes and admin-only access
- **Data Validation**: Zod schema validation
- **CORS**: Properly configured for cross-origin requests
- **HTTPS**: Production-ready with SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the Runtime Traitors Team**



    



>>>>>>> ef6e84de6a3f214c29bd0bb80fb33954b725c19d
