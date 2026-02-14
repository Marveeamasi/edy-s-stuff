# Todo Application Project

A modern, fully-featured Todo application built with React that showcases frontend engineering skills. This project demonstrates the ability to work with APIs, implement React patterns, handle routing, and create accessible user interfaces.

## Project Overview

This Todo application was built following strict requirements to demonstrate proficiency in:
- Frontend development with React 19+
- API integration and data fetching
- Client-side routing with React Router
- Responsive design and accessibility
- Error handling and loading states
- Component-based architecture
- Modern CSS with Tailwind CSS

## Technology Stack

### Required Technologies ✅

- **React 19+**: Functional components and hooks (useState, useEffect, useMemo, Suspense)
- **React Router**: Client-side routing for navigation between pages
- **Axios**: HTTP client for API integration with Tanstack Query pattern
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Modern build tool and development server
- **Error Boundary**: Proper error handling component
- **SEO**: Semantic HTML and proper accessibility attributes

### API Integration ✅

- **Base URL**: https://api.oluwasetemi.dev
- **Documentation**: https://api.oluwasetemi.dev/reference

#### Core Endpoints Implemented:
- `GET /tasks` - List all tasks with pagination
- `GET /tasks/{id}` - Get a single task
- `POST /tasks` - Create a task (ready for future implementation)
- `PUT /tasks/{id}` - Update a task (ready for future implementation)
- `DELETE /tasks/{id}` - Delete a task (ready for future implementation)

## Features Implemented

### Required Features (50%) ✅

#### 1. Todo List & Pagination ✅
- ✅ Display todos from the API with pagination (10 items per page)
- ✅ Show title, completion status, and other relevant information
- ✅ User-friendly pagination controls with Previous/Next buttons
- ✅ Current page indicator and page number buttons
- ✅ Smooth scrolling to top on page change

#### 2. Todo Details ✅
- ✅ Nested route to display individual todo details (`/todos/:id`)
- ✅ Show all available information about the selected todo
- ✅ Navigation back to the main list with breadcrumb
- ✅ Clean, organized detail view layout

#### 3. Error Handling ✅
- ✅ Implemented Error Boundary component for runtime errors
- ✅ Test route (`/error-test`) that triggers the error boundary
- ✅ Custom 404 page for undefined routes
- ✅ Graceful error messages with retry functionality
- ✅ API error handling with user-friendly feedback

#### 4. Basic UI/UX ✅
- ✅ Semantic HTML elements (header, main, footer, article, nav, section)
- ✅ Proper accessibility attributes (ARIA labels, roles, focus management)
- ✅ Mobile and desktop responsiveness
- ✅ Consistent styling throughout the application
- ✅ Loading states during API calls with spinner animation
- ✅ Focus management for keyboard navigation
- ✅ Color contrast compliance (WCAG AA)
- ✅ Screen reader compatibility

#### 5. Search & Filtering ✅
- ✅ Search functionality to filter todos by title
- ✅ Real-time search updates
- ✅ Filter by completion status (All/Completed/Incomplete)
- ✅ Combined search and filter functionality
- ✅ Empty state messages when no results found

### Accessibility Features ✅

- ✅ Semantic HTML elements (header, main, footer, nav, article, section, time)
- ✅ Proper ARIA attributes (aria-label, aria-current, aria-live, aria-hidden)
- ✅ Keyboard navigation support
- ✅ Color contrast compliance (WCAG AA standard)
- ✅ Screen reader compatibility
- ✅ Focus management with visible focus indicators

### Documentation (5%) ✅

This README includes:
- ✅ Project description and features
- ✅ Setup instructions
- ✅ Available scripts
- ✅ Technology choices and reasoning
- ✅ Known issues and future improvements
- ✅ API documentation reference

## Project Structure

```
todo-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── ErrorBoundary.jsex
│   │   ├── Loading.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchFilter.jsx
│   │   └── TodoCard.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useTodos.js
│   ├── pages/            # Page components
│   │   ├── ErrorTest.jsx
│   │   ├── NotFound.jsx
│   │   ├── TodoDetail.jsx
│   │   └── TodoList.jsx
│   ├── utils/            # Utility functions
│   │   └── api.js
│   ├── App.jsx           # Main App component with routing
│   ├── index.css         # Global styles with Tailwind
│   └── main.jsx          # Application entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Technology Choices and Reasoning

### Why React 19+?
- Modern hooks API for cleaner component logic
- Built-in Suspense for better loading states
- Excellent performance and developer experience
- Large ecosystem and community support

### Why React Router?
- Industry-standard routing solution for React
- Declarative routing with nested routes
- Built-in support for navigation and URL parameters
- Excellent documentation and community support

### Why Axios?
- Promise-based HTTP client with better error handling
- Request and response interceptors for centralized logic
- Automatic JSON transformation
- Better browser compatibility than fetch

### Why Tailwind CSS?
- Utility-first approach for rapid development
- Consistent design system out of the box
- Excellent mobile-first responsive design
- Small production bundle size with purging
- Easy to maintain and customize

### Why Vite?
- Extremely fast development server with HMR
- Optimized production builds
- Modern tooling with ESM support
- Better developer experience than Create React App

## Key Features Explained

### Pagination System
The application implements a robust pagination system that:
- Fetches 10 todos per page from the API
- Displays page numbers and Previous/Next controls
- Scrolls to the top when changing pages
- Shows current page state visually

### Search and Filter
Users can:
- Search todos by title with real-time updates
- Filter by completion status (All/Completed/Incomplete)
- Combine search and filter for precise results
- See helpful messages when no results are found

### Error Handling
The application has multiple layers of error handling:
1. **Error Boundary**: Catches React component errors
2. **API Error Handling**: Handles network and API errors gracefully
3. **404 Page**: Custom page for undefined routes
4. **Loading States**: Shows spinners during data fetching

### Accessibility
The application follows WCAG AA standards:
- Semantic HTML for better screen reader support
- ARIA attributes for enhanced accessibility
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus management and visible focus indicators

## API Integration Details

### Custom Hook Pattern
The application uses custom hooks (`useTodos`, `useTodoById`) that:
- Encapsulate data fetching logic
- Manage loading and error states
- Provide automatic refetching capabilities
- Follow React best practices

### API Error Handling
All API calls include:
- Try-catch error handling
- User-friendly error messages
- Retry functionality
- Loading state management

## Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tailwind's responsive utilities (sm, md, lg breakpoints)
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues and Future Improvements

### Current Limitations
1. CRUD operations (Create, Update, Delete) are implemented in the API utility but not yet connected to the UI
2. No authentication system (marked as advanced feature)
3. No real-time updates via WebSocket (marked as advanced feature)

### Planned Enhancements
1. **CRUD Operations**: Add forms for creating, editing, and deleting todos
2. **Authentication**: Implement user login/signup flows
3. **Real-Time Updates**: Connect to WebSocket for live updates
4. **User Profile**: Add user profile management
5. **Protected Routes**: Implement route guards for authenticated users
6. **Improved Filtering**: Add more filter options (date, priority, tags)
7. **Drag and Drop**: Allow reordering of todos
8. **Dark Mode**: Add theme switching capability
9. **Offline Support**: Implement service workers for offline functionality
10. **Unit Tests**: Add comprehensive test coverage

## Performance Optimizations

- **Code Splitting**: Routes are lazy-loaded with Suspense
- **Memoization**: `useMemo` for expensive computed values
- **Optimized Re-renders**: Proper component structuring to minimize re-renders
- **Tailwind Purging**: Unused CSS is removed in production builds

## Deployment

### Recommended Platforms
- **Netlify**: Zero-config deployment with continuous deployment
- **Vercel**: Optimized for React applications
- **PipeOps**: Container-based deployment

### Deployment Steps

1. Build the production version:
```bash
npm run build
```

2. The `dist` folder contains the production-ready files

3. Deploy to your chosen platform following their documentation

### Environment Variables
No environment variables are required for the current implementation as the API URL is hardcoded. For production, consider using:
```
VITE_API_BASE_URL=https://api.oluwasetemi.dev
```

## Submission Guidelines

### Repository Setup ✅
- ✅ Private GitHub repository created
- ✅ Clear commit messages throughout development
- ✅ Proper `.gitignore` file included
- ✅ Ready to add @Oluwasetemi as collaborator

### Deployment
- Application is deployed to Vercel
- All features work in production environment

## Contributing

This is a demonstration project for my frontend engineering assessment. The code follows best practices and is well-commented for any one to understand.

## License

MIT License - This project was created as part of my frontend engineering assessment.

---

**Built by Edikan Abikpa from scratch using React, Tailwind CSS, and modern web technologies**