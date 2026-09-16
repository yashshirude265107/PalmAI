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


## 🔄 Application Flow

### 1. User Registration

  User
  │
  ▼
Registration Form
  │
  ▼
POST /api/auth/register
  │
  ▼
Express Controller
  │
  ▼
Password Hashing using bcrypt
  │
  ▼
SQLite users table
  │
  ▼
User Created


### 2. User Login

User
  │
  ▼
Email + Password
  │
  ▼
POST /api/auth/login
  │
  ▼
Find User in SQLite
  │
  ▼
Compare Password
  │
  ▼
Generate JWT Token
  │
  ▼
Send Token to Frontend


### 3. Palm Image Upload

User selects image
       │
       ▼
React Frontend
       │
       ▼
POST /api/upload
       │
       ▼
Express + Multer
       │
       ▼
Image Validation
       │
       ▼
Image Stored / Processed
       │
       ▼
Image URL returned

### 4. Palm Image Analysis

Palm Image
    │
    ▼
React Frontend
    │
    ▼
POST /api/analyze
    │
    ▼
Backend Controller
    │
    ▼
Base64 Image
    │
    ▼
Gemini Multimodal API
    │
    ▼
AI Image Analysis
    │
    ▼
Structured JSON Response
    │
    ▼
SQLite Reports Table
    │
    ▼
Frontend Report


### 🤖 Google Gemini AI Integration

PalmAI uses Google's Gemini API for multimodal image analysis.

The backend sends two main inputs to Gemini:
1.Text prompt
2.Palm image

Example:

const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,

    contents: [
        {
            role: "user",

            parts: [
                {
                    text: PALM_READING_SYSTEM_PROMPT
                },

                {
                    inlineData: {
                        mimeType: mimeType,
                        data: base64Image
                    }
                }
            ]
        }
    ]
});


Gemini receives the image together with the instructions and returns the requested analysis.


