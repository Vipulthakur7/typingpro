# VipulType Pro - Typing Speed Test Application

## Overview

This is a modern typing speed test application built with React, TypeScript, and Express.js by Vipul. The application features a sleek dark theme UI with glassmorphism effects, real-time typing statistics, and progressive difficulty levels. It provides an engaging way for users to practice and improve their typing skills while tracking their progress over time.

## Recent Changes (January 16, 2025)
- Rebranded from "TypingFlow" to "VipulType Pro" to showcase Vipul's authorship
- Updated color scheme from purple-blue to cyan-pink-purple gradient for uniqueness
- Added personalized text samples mentioning Vipul's work and philosophy
- Created custom signature component with animated version indicator
- Enhanced audio feedback with A5 note frequency and triangle wave for better sound
- Updated completion messages and branding throughout the application

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **API**: RESTful endpoints for session management and user settings
- **Storage**: Abstracted storage interface with in-memory implementation (fallback)

## Key Components

### Database Schema
- **typing_sessions**: Stores individual typing test results (WPM, accuracy, time, difficulty, errors)
- **user_settings**: Manages user preferences (theme, sound settings, difficulty level)

### API Endpoints
- `POST /api/sessions` - Save typing session results
- `GET /api/sessions` - Retrieve recent typing sessions
- `GET /api/stats` - Get best performance statistics
- `GET /api/settings` - Fetch user settings
- `PATCH /api/settings` - Update user preferences

### Core Features
- **Real-time Typing Test**: Live WPM, accuracy, and CPM calculation
- **Progressive Difficulty**: Easy, medium, and hard text samples
- **Custom Text Mode**: Users can input their own practice text
- **Audio Feedback**: Optional keyboard sound effects
- **Theme System**: Dark/light mode with CSS variables
- **Progress Tracking**: Historical performance data storage

### UI Components
- **StatsDashboard**: Real-time performance metrics display
- **TypingArea**: Main typing interface with text highlighting
- **Theme Provider**: Global theme and sound preference management
- **Progress Components**: Visual feedback for typing progress

## Data Flow

1. **Initialization**: Application loads with default settings and fetches user preferences
2. **Text Generation**: Random text samples are selected based on difficulty level
3. **Real-time Tracking**: Keystroke events update WPM, accuracy, and progress metrics
4. **Session Storage**: Completed sessions are saved to the database via API
5. **Statistics Aggregation**: Best performance metrics are calculated and displayed

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Library**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **State Management**: TanStack React Query
- **Utilities**: date-fns, embla-carousel-react

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)
- **Validation**: Zod with drizzle-zod integration
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Build Tools**: esbuild for server bundling, tsx for development

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full type safety across the stack
- **Code Quality**: ESLint, Prettier (implicit)
- **Replit Integration**: Cartographer plugin and runtime error overlay

## Deployment Strategy

### Development Environment
- Uses tsx for hot-reloading TypeScript server development
- Vite development server with HMR for frontend
- In-memory storage fallback for database-less development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to ESM format in `dist/`
- **Database**: Drizzle migrations manage schema changes
- **Environment**: Requires `DATABASE_URL` for PostgreSQL connection

### Database Configuration
- PostgreSQL as primary database (configured via DATABASE_URL)
- Drizzle Kit handles migrations and schema synchronization
- Fallback to in-memory storage for development without database

### Hosting Considerations
- Static frontend assets served from Express server
- API routes handle backend functionality
- Session management requires persistent database connection
- Environment variables needed: DATABASE_URL for production database

The application is designed to be easily deployable on platforms like Replit, Vercel, or any Node.js hosting environment that supports PostgreSQL databases.