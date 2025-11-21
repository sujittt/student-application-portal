# College Application Portal

A web application for college applications with multi-step form, document upload, and AI chat assistance.

## Technologies Used

### Frontend Framework
- **React 18.3.1** - JavaScript library for building user interfaces
- **TypeScript** - Static typing for JavaScript

### Build Tools
- **Vite** - Fast build tool and development server
- **npm** - Package manager

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### UI Components & Icons
- **React Icons** - Icon library for UI elements

### State Management
- **React Hooks** - Built-in state management (useState, useEffect)
- **LocalStorage** - Browser storage for data persistence

### Utilities
- **Marked** - Markdown parser for chat messages

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - DOM matchers for tests

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

## Features

- Multi-step application form (Personal Info, Academic Info, Documents, Review)
- Form validation with error messages
- Document upload (PDF only, max 10MB)
- AI chat assistant for application help
- Video tutorial with progress tracking
- Dark/Light theme toggle
- Auto-save form data to localStorage
- Progress tracking with completion indicator
- Responsive design for all devices

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Type Checking

```bash
npm run typecheck
```

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── test/               # Test setup
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## License

MIT License
