# Medisage Assignment

## Setup Instructions

### Prerequisites
- Node.js (v16+. Recommended v20+)
- MongoDB (Running locally or connection string for Atlas)

### Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add necessary environment variables (e.g., `PORT=5000`, `MONGO_URI=your_mongodb_uri`).
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder if needed (e.g. `VITE_API_BASE_URL=http://localhost:5000`).
4. Start the frontend client:
   ```bash
   npm run dev
   ```

## Project Structure

```text
Medisage-assignment/
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/           # Database & environment config
│   │   ├── middlewares/      # Express middlewares
│   │   ├── modules/          # API resources (project, task)
│   │   └── utils/            # Helper functions
│   ├── app.js                # Express app setup
│   ├── server.js             # Entry point
│   ├── Medisage.postman_collection.json # API Documentation
│   └── package.json
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # View components (Home)
│   │   ├── services/         # API integration layer
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Entry point
│   ├── index.html            
│   ├── vite.config.js        
│   └── package.json          
├── .gitignore
└── README.md
```

## Demo Video

[Insert your demo video link here]

## Submission Requirements

Candidates must submit the following:
- GitHub repository link
- README file with setup instructions
- API documentation or Postman collection
- Screenshots or short demo video of the UI.
