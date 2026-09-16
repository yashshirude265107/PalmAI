# PalmAI 🔮

PalmAI is an AI-powered palm reading web application that analyzes uploaded palm images using Google's Gemini Multimodal AI API and generates a structured palm reading report.

The application provides user authentication, palm image upload, AI-based analysis, report generation, report history, and report management.

---

## 🚀 Features

- User Registration
- User Login
- JWT-based Authentication
- Password Hashing
- Palm Image Upload
- Palm Image Validation
- Base64 Image Processing
- Google Gemini AI Integration
- Gemini Multimodal / Vision Analysis
- Structured JSON AI Response
- Palm Line Analysis
- Mount Analysis
- Career Analysis
- Education Analysis
- Love and Marriage Analysis
- Business and Finance Analysis
- Personality Analysis
- Strengths and Weaknesses
- Lucky Number, Color and Day
- Future Timeline
- AI Analysis Score
- Report Storage
- Report History
- Individual Report View
- Report Deletion
- RESTful APIs
- SQLite Database
- Rate Limiting
- Helmet Security
- CORS Protection
- XSS Protection
- Error Handling

---

# 🛠️ Technologies Used

## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

## Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- Multer
- Helmet
- CORS
- Express Rate Limit
- XSS Clean
- Morgan

## Database

- SQLite
- better-sqlite3

## AI

- Google Gemini API
- Gemini Multimodal / Vision Model
- Prompt Engineering
- Base64 Image Encoding
- Structured JSON Generation

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- Nodemon

---

# 🏗️ Project Architecture

```text
                         ┌──────────────────┐
                         │      User        │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ React Frontend   │
                         └────────┬─────────┘
                                  │
                              REST API
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Node.js +        │
                         │ Express.js       │
                         └────────┬─────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
       ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
       │ JWT Auth    │    │ Image Upload │    │ SQLite       │
       │             │    │              │    │ Database     │
       └─────────────┘    └──────┬───────┘    └──────────────┘
                                 │
                                 ▼
                         ┌──────────────────┐
                         │ Base64 Image     │
                         │ Processing       │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Google Gemini AI │
                         │ Multimodal API   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Structured JSON  │
                         │ Palm Analysis    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ SQLite Reports   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Report History   │
                         └──────────────────┘



# 📂 Project Structure

```

PalmAI/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── analyzeController.js
│   │   ├── historyController.js
│   │   ├── profileController.js
│   │   ├── reportController.js
│   │   └── uploadController.js
│   │
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Report.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── uploadRoutes.js
│   │   ├── analyzeRoutes.js
│   │   ├── historyRoutes.js
│   │   ├── profileRoutes.js
│   │   └── reportRoutes.js
│   │
│   ├── services/
│   │   └── geminiService.js
│   │
│   ├── uploads/
│   │
│   ├── utils/
│   │   └── asyncHandler.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
              
