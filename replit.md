# School Management System

## Overview

This is a comprehensive school management system built with React, Express, and PostgreSQL. The application provides administrative tools for managing students, staff, financial records, vendor relationships, and generating reports. It features a Material Design-inspired interface with support for both light and dark themes, focusing on clarity, efficiency, and professional consistency for daily administrative use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** components built on Radix UI primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Material Design principles** applied through custom color palette and spacing system
- Components organized in `/client/src/components/ui/` for reusable UI primitives
- Domain-specific components in `/client/src/components/` (tables, forms, reports)

**Design System**
- Light/dark theme support via ThemeProvider context
- Custom CSS variables for colors defined in `index.css`
- Material Design color palette with semantic colors for status indicators
- Typography using Inter (primary) and JetBrains Mono (financial data) fonts
- Responsive grid layouts for dashboard and data-heavy interfaces

**State Management**
- Theme state managed via React Context (`ThemeProvider`)
- Form state handled with React Hook Form and Zod validation
- Server state cached and synchronized with TanStack Query
- Local component state with React hooks

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- RESTful API architecture with `/api` prefix for all routes
- Middleware for JSON parsing, URL encoding, and request logging
- Error handling middleware for centralized error responses

**Development Setup**
- Vite middleware integration for HMR in development
- Separate build process using esbuild for production server bundle
- Development server runs with `tsx` for TypeScript execution
- Static file serving for production builds

**Storage Layer**
- **In-memory storage** (MemStorage) as current implementation
- Interface-based design (`IStorage`) allows easy swap to database implementation
- CRUD operations abstracted through storage interface
- Designed for future PostgreSQL integration via Drizzle ORM

### Data Storage Solutions

**Database Schema (Prepared for PostgreSQL)**
- Drizzle ORM configured for PostgreSQL via Neon serverless
- Schema defined in `/shared/schema.ts` for shared types between client/server
- Currently implements basic user authentication schema
- Database migrations managed through Drizzle Kit in `/migrations`

**Current Implementation**
- In-memory Map-based storage for development
- UUID generation for entity IDs
- Async/await patterns for future database compatibility

**Planned Expansion**
- Student records with roll numbers, class assignments, fee status
- Staff records with employee IDs, departments, salary information
- Financial transactions (income/expenses) with vendor tracking
- Report generation data aggregation

### Authentication & Authorization

**Dual Authentication System**
The application features environment-aware authentication that automatically detects and uses the appropriate method:

**Local Development Mode** (when `REPL_ID` is not present):
- Username/password authentication via Passport.js Local Strategy
- Bcrypt password hashing with salt rounds
- Login form displayed directly on landing page
- Session cookies work over HTTP (secure flag disabled for local development)
- Sessions use MemoryStore when DATABASE_URL is not configured
- Random session secret generated per server boot if SESSION_SECRET not set
- Test user available: `admin@test.com` / `admin123` (created via seed script)

**Production Mode** (when `REPL_ID` is present):
- Replit OIDC authentication for single sign-on
- Secure session cookies (HTTPS only)
- Persistent sessions via PostgreSQL when DATABASE_URL configured
- Requires SESSION_SECRET environment variable (throws error if missing)
- Landing page shows "Sign In" button that redirects to Replit auth

**Session Management**
- Shared session configuration across both authentication modes
- Session TTL: 7 days
- Session store: PostgreSQL (when DATABASE_URL present) or MemoryStore (fallback)
- Cookie security: httpOnly always enabled, secure enabled only in production

**Implementation Files**
- `server/replitAuth.ts` - Session setup and Replit OIDC strategy
- `server/localAuth.ts` - Passport Local Strategy with bcrypt
- `server/routes.ts` - Authentication routes (POST /api/login for local, GET /api/login for OIDC)
- `client/src/components/LoginForm.tsx` - Login form component for local development
- `client/src/pages/Landing.tsx` - Conditional rendering based on environment

**Role-Based Access Control**
- User roles: Admin, Teacher, Accountant (stored in user schema)
- All API routes protected with `isAuthenticated` middleware
- Role assignment happens during user creation/registration

### External Dependencies

**Core Libraries**
- **@neondatabase/serverless** - PostgreSQL database connectivity with WebSocket support
- **drizzle-orm** & **drizzle-zod** - Type-safe ORM and schema validation
- **express** - Web application framework
- **wouter** - Lightweight routing for React
- **@tanstack/react-query** - Async state management

**UI Component Libraries**
- **@radix-ui/* packages** - Accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **lucide-react** - Icon system
- **date-fns** - Date formatting and manipulation
- **react-hook-form** with **@hookform/resolvers** - Form handling with Zod validation

**Development Tools**
- **TypeScript** - Type safety across full stack
- **Tailwind CSS** with **PostCSS** - Styling system
- **Vite plugins** - Runtime error overlay, dev banner, source mapping (Replit-specific)

**Utilities**
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Class name utilities
- **nanoid** - ID generation
- **ws** - WebSocket support for Neon database