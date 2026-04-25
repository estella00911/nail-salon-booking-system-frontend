# Nail Salon Booking System

## Overview

### Problem & Solution
This project solves real-world scheduling problems in nail salons. Instead of manual booking via messages or phone calls, it provides a system where users can view available time slots and make bookings directly, reducing double booking and improving efficiency.

### Technical Highlights
This project demonstrates authentication system, service browsing, and booking workflow implementation.

### Scope
The current version focuses on authentication system, customer booking flow, and service browsing. Advanced filter for services are planned for future iterations.

## Techniques Used
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/estella00911/nail-salon-booking-system-frontend.git
cd nail-salon-booking-system-frontend
```
### 2. Install dependencies
npm install

### 3. Set up environment variables
create a `.env` file in the root folder
```bash
touch .env
```
Add the API base URL in `.env`:
```script
VITE_API_BASE_URL=http://localhost:3000
```
for the production, API base URL should be below:
```script
VITE_API_BASE_URL=http://api.lunailstudio.com
```
### 4. Run the development server
`npm run dev`
This app will usually run at:
`http://localhost:5173`

## Project Structure
```
src/
├── api/          # API request functions
├── assets/       # images and icons
├── components/   # reusable UI components
├── pages/        # page-level components
├── routes/       # protected routes and routing helpers
├── types/        # shared TypeScript types
├── App.tsx       # app routes
└── main.tsx      # app entry point
```
## Backend API

This frontend web applicatoin connects to the Nail Salon Booking System API.

- Local API: http://localhost:3000
- Production API: https://api.lunailstudio.com
- API Docs: https://api.lunailstudio.com/api-docs

## Run Backend and Frontend Locally

### Backend API
Follow the [**Getting Started** section in the backend `README.md`](https://github.com/estella00911/nail-salon-booking-system#getting-started).

### Frontend Web Application
Follow the [**Getting Started** section in this `README.md`](https://github.com/estella00911/nail-salon-booking-system-frontend#getting-started).

### ### Run both applications
Make sure both applications are running at the same time:
- Backend API: `http://localhost:3000`
- Frontend app: `http://localhost:5173`

## UI/UX Design
[View Figma Design](https://www.figma.com/design/fblv4fbU2xERfVWYZcUHUh/Nail-Salon-UI?node-id=0-1&t=dmMNTxofQQulqryb-1)