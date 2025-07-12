# Ripple - Community Engagement Platform

![Ripple](public/image.png)

Ripple is a modern community engagement platform built with Next.js that helps teams connect, collaborate, and grow their communities. With a suite of integrated tools for real-time communication, event management, polls, and social media integration, Ripple provides everything you need to build and nurture vibrant communities.

## Features

- **Real-time Collaboration**: Connect your team with instant messaging, media sharing, and interactive reactions
- **Event & Calendar Management**: Plan, organize and track events with integrated scheduling and RSVPs
- **Data-driven Insights**: Gather feedback and make informed decisions with interactive polls and visualized results
- **Community Forums**: Build knowledge bases with organized discussions and expert verification features
- **Personalized Content**: Deliver tailored updates with an AI-powered feed that learns user preferences
- **Third-party Integrations**: Connect with your favorite tools and existing workflows
- **Social Media Automation**: Manage social media posts and interactions through integrations with Instagram, Facebook, and Twitter

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS, Emotion
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Context API
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Clerk account for authentication

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/ripple"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (auth)/      # Authentication routes
│   │   ├── (protected)/ # Protected dashboard routes
│   │   ├── (website)/   # Public website routes
│   │   ├── api/         # API routes
│   ├── components/      # React components
│   │   ├── global/      # Global components
│   │   ├── ui/          # UI components
│   ├── lib/             # Utility functions
│   ├── providers/       # React context providers
│   ├── svgs/            # SVG components
```

## Deployment

The application can be deployed on Vercel or any other hosting platform that supports Next.js applications.

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## License

© 2025 Ripple. All rights reserved.
