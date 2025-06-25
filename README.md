# Quiz Application

A simple interactive quiz application with backend API built with ASP.NET Core and a React frontend.

## Features

- Interactive quiz with multiple-choice questions
- Score tracking and history
- User-friendly interface
- Real-time feedback

## Project Structure

The project consists of two main parts:

### Backend (ASP.NET Core)

The backend is responsible for:
- Serving quiz questions from a JSON file
- Storing and retrieving user scores
- Providing RESTful API endpoints

### Frontend (React)

The frontend provides:
- User interface for taking quizzes
- Score display and history
- Responsive design

## Getting Started

### Prerequisites

- .NET 9.0 SDK
- Node.js and npm

### Running the Application

1. Start the backend:

```bash
cd backend
dotnet run
```

2. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Open your browser and navigate to the URL shown in the frontend terminal output (typically http://localhost:5173).

## API Endpoints

- `GET /questions` - Get all quiz questions
- `GET /questions/{id}` - Get a specific question by ID
- `GET /scores` - Get all stored scores
- `POST /scores` - Add a new score
- `DELETE /scores` - Clear all scores

## Technologies Used

- ASP.NET Core 9.0
- React 19.1.0
- Vite
- JSON Storage

## License

This project is open source.
