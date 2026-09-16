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

```text
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
```

---

# 🔄 Application Flow

## 1. User Registration

```text
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
```

The user enters registration information through the React frontend.

The request is sent to the Express backend where the password is hashed using `bcryptjs` before being stored in SQLite.

---

## 2. User Login

```text
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
```

The JWT token is used to authenticate protected API requests.

---

## 3. Palm Image Upload

```text
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
```

The backend validates the uploaded image before processing it.

Supported image types:

```text
image/jpeg
image/png
image/webp
```

---

## 4. Palm Image Analysis

```text
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
```

---

# 🤖 Google Gemini AI Integration

PalmAI uses Google's Gemini API for multimodal image analysis.

The backend sends two main inputs to Gemini:

1. Text prompt
2. Palm image

Example:

```javascript
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
```

Gemini receives the image together with the instructions and returns the requested analysis.

The response is processed by the backend and stored as a structured report.

---

# 🧠 Prompt Engineering

PalmAI uses a structured prompt to instruct Gemini about the expected analysis and output format.

The AI is instructed to return JSON containing multiple palm-reading sections.

Example response structure:

```json
{
  "handShape": "",
  "palmShape": "",
  "fingerShape": "",
  "thumbAnalysis": "",
  "lifeLine": "",
  "heartLine": "",
  "headLine": "",
  "fateLine": "",
  "sunLine": "",
  "marriageLine": "",
  "moneyLine": "",
  "healthLine": "",
  "mountJupiter": "",
  "mountSaturn": "",
  "mountApollo": "",
  "mountMercury": "",
  "mountVenus": "",
  "mountMoon": "",
  "career": "",
  "education": "",
  "love": "",
  "marriage": "",
  "business": "",
  "finance": "",
  "children": "",
  "travel": "",
  "personality": "",
  "strengths": "",
  "weaknesses": "",
  "luckyNumber": "",
  "luckyColor": "",
  "luckyDay": "",
  "futureTimeline": "",
  "overallSummary": "",
  "analysisScore": 0
}
```

This structured response allows the frontend to display each section separately.

---

# 🖼️ Base64 Image Processing

PalmAI converts the uploaded image into Base64 data before sending it to Gemini.

The flow is:

```text
Image File
    │
    ▼
Binary Image Data
    │
    ▼
Base64 Encoding
    │
    ▼
Gemini API Request
    │
    ▼
Multimodal Image Analysis
```

Base64 is an encoding mechanism that represents binary data as text.

In PalmAI, the Base64 string is placed in the Gemini request as image data.

---

# 🗄️ SQLite Database

PalmAI uses SQLite with `better-sqlite3`.

SQLite is an embedded relational database. It stores the database in a local file instead of requiring a separate database server.

Example database file:

```text
palmai.db
```

The Node.js application directly opens the database using `better-sqlite3`.

Example:

```javascript
const Database = require("better-sqlite3");

const db = new Database("palmai.db");
```

SQLite is used to store user information and generated palm-reading reports.

---

# 📊 Database Tables

## Users Table

The `users` table stores authentication and user information.

| Column | Purpose |
|---|---|
| id | Unique user ID |
| name | User name |
| email | User email |
| password | Hashed password |
| avatar | User avatar |
| role | User role |
| created_at | Account creation time |

---

## Reports Table

The `reports` table stores generated palm-reading reports.

| Column | Purpose |
|---|---|
| id | Report ID |
| user_id | User who owns the report |
| palmImageUrl | Uploaded palm image location |
| handSide | Left, right or unspecified |
| report | AI-generated JSON report |
| analysisScore | Analysis score |
| status | Report status |
| created_at | Report creation time |

---

# 🔐 Authentication

PalmAI uses JSON Web Tokens (JWT) for authentication.

The authentication flow is:

```text
Login
  │
  ▼
Validate Credentials
  │
  ▼
Generate JWT
  │
  ▼
Frontend Receives Token
  │
  ▼
Token Sent With Protected Requests
  │
  ▼
Authentication Middleware
  │
  ▼
Verify JWT
  │
  ▼
Allow / Reject Request
```

The authenticated user's ID is used to access their own reports.

Protected APIs require a valid JWT token.

---

# 🔑 Password Security

PalmAI uses `bcryptjs` for password hashing.

Passwords are not stored as plain text.

```text
Plain Password
      │
      ▼
bcrypt Hash
      │
      ▼
SQLite Database
```

During login:

```text
Entered Password
      │
      ▼
bcrypt Compare
      │
      ▼
Stored Password Hash
      │
      ▼
Valid / Invalid
```

This prevents the application from storing users' original passwords directly in the database.

---

# 🛡️ Security

PalmAI implements several backend security mechanisms.

### Helmet

Adds security-related HTTP headers.

### CORS

Controls which frontend origins are allowed to communicate with the backend.

### Rate Limiting

Limits excessive API requests.

### XSS Protection

Helps protect against malicious cross-site scripting input.

### JWT Authentication

Protects authenticated API routes.

### Password Hashing

Passwords are hashed using bcrypt.

### Input Validation

Validates incoming request data.

### Image Validation

Checks allowed image types and file size.

### Environment Variables

Sensitive configuration such as API keys and JWT secrets are stored in `.env`.

---

# 📡 API Endpoints

## Authentication

### Register

```text
POST /api/auth/register
```

Creates a new user account.

### Login

```text
POST /api/auth/login
```

Authenticates a user and returns authentication information.

---

## Image Upload

```text
POST /api/upload
```

Uploads and processes the palm image.

---

## Palm Analysis

```text
POST /api/analyze
```

Sends the palm image to Gemini and generates the palm-reading report.

---

## Report History

```text
GET /api/history
```

Returns reports belonging to the authenticated user.

```text
GET /api/history/:id
```

Returns a specific report.

---

## Delete Report

```text
DELETE /api/report/:id
```

Deletes a specific report belonging to the authenticated user.

---

## Health Check

```text
GET /api/health
```

Checks whether the backend server is running.

Example response:

```json
{
  "success": true,
  "message": "PalmAI Running"
}
```

---

# 🔗 Frontend → Backend Communication

The React frontend communicates with the Express backend through REST APIs.

```text
React Frontend
      │
      │ HTTP Request
      ▼
Express API
      │
      ▼
Route
      │
      ▼
Controller
      │
      ▼
Service / Model
      │
      ├──────────────► Gemini API
      │
      └──────────────► SQLite Database
```

The backend returns JSON responses to the frontend.

---

# 📄 Report Generation

After Gemini returns the analysis:

```text
Gemini Response
      │
      ▼
JSON Parsing
      │
      ▼
AI Result
      │
      ▼
Report Model
      │
      ▼
SQLite Database
      │
      ▼
API Response
      │
      ▼
React Report UI
```

The structured AI response is processed by the backend and stored in the reports table.

The frontend then displays the generated report to the user.

---

# 📋 AI Report Sections

PalmAI generates analysis for:

- Hand Shape
- Palm Shape
- Finger Shape
- Thumb Analysis
- Life Line
- Heart Line
- Head Line
- Fate Line
- Sun Line
- Marriage Line
- Money Line
- Health Line
- Jupiter Mount
- Saturn Mount
- Apollo Mount
- Mercury Mount
- Venus Mount
- Moon Mount
- Career
- Education
- Love
- Marriage
- Business
- Finance
- Children
- Travel
- Personality
- Strengths
- Weaknesses
- Lucky Number
- Lucky Color
- Lucky Day
- Future Timeline
- Overall Summary
- Analysis Score

---

# ⚙️ Installation

## Prerequisites

Install the following:

- Node.js 18+
- npm
- Git
- GitHub account

---

# Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory:

```text
backend/.env
```

Add:

```env
PORT=5000

GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest

JWT_SECRET=your_jwt_secret_here
```

Start the development server:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

or, depending on the frontend configuration:

```bash
npm start
```

---

# 🔐 Environment Variables

PalmAI uses environment variables for sensitive configuration.

Example:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-flash-latest
JWT_SECRET=your_secret
```

The actual `.env` file must never be committed to GitHub.

Use:

```text
.env.example
```

for documenting required environment variables.

---

# 🚫 Files Excluded From GitHub

The following files/directories should not be committed:

```text
.env
node_modules/
*.db
*.db-shm
*.db-wal
logs/
```

This prevents API keys, local databases, dependencies and sensitive files from being exposed.

---

# 🧪 Testing

Backend APIs can be tested using Postman.

Typical testing flow:

```text
1. Register User
        │
        ▼
2. Login
        │
        ▼
3. Receive JWT
        │
        ▼
4. Upload Palm Image
        │
        ▼
5. Analyze Palm
        │
        ▼
6. Receive Report
        │
        ▼
7. Get History
        │
        ▼
8. Open Report
        │
        ▼
9. Delete Report
```

Testing can be performed for authentication, image upload, AI analysis, report history and report deletion APIs.

---

# 📈 Error Handling

PalmAI uses centralized error handling middleware.

The backend handles errors such as:

- Invalid request
- Invalid image type
- Image too large
- Unauthorized user
- Invalid JWT
- AI API errors
- Database errors
- Missing resources
- Invalid report ID

Centralized error handling helps provide consistent API responses when an error occurs.

---

# 🧩 Important Backend Components

## server.js

Responsible for:

- Starting Express server
- Loading environment variables
- Middleware configuration
- CORS
- Helmet
- JSON parsing
- Routes
- Error handling

---

## Controllers

Controllers handle incoming API requests.

Examples:

```text
authController.js
analyzeController.js
historyController.js
profileController.js
reportController.js
uploadController.js
```

They receive requests, call the required services/models, and send responses.

---

## Routes

Routes define API endpoints.

Examples:

```text
/api/auth
/api/upload
/api/analyze
/api/history
/api/profile
/api/report
```

---

## Models

Models handle database operations.

Examples:

```text
User
Report
```

Typical operations include:

```text
Report.create()
Report.findById()
Report.findByUser()
Report.delete()
```

---

## Services

Services contain external or reusable business logic.

The Gemini service handles communication with Google's Gemini API.

Example:

```text
services/
└── geminiService.js
```

---

# 🗃️ SQLite Data Flow

PalmAI uses SQLite as the application's relational data storage layer.

The main data flow is:

```text
User Registration
       │
       ▼
User Data
       │
       ▼
Password Hashing
       │
       ▼
SQLite Users Table
```

For palm reports:

```text
Palm Image
       │
       ▼
Gemini AI Analysis
       │
       ▼
Structured JSON
       │
       ▼
Report Model
       │
       ▼
SQLite Reports Table
       │
       ▼
Report History
       │
       ▼
React Frontend
```

The `user_id` connects generated reports with the authenticated user.

---

# 🌐 Complete PalmAI Flow

```text
                    USER
                      │
                      ▼
               React Frontend
                      │
                      ▼
              User Authentication
                      │
                      ▼
                 JWT Token
                      │
                      ▼
              Upload Palm Image
                      │
                      ▼
               Express Backend
                      │
                      ▼
               Image Validation
                      │
                      ▼
               Base64 Encoding
                      │
                      ▼
              Google Gemini API
                      │
                      ▼
              Image Understanding
                      │
                      ▼
               Palm Interpretation
                      │
                      ▼
               Structured JSON
                      │
                      ▼
                 Report Model
                      │
                      ▼
                 SQLite DB
                      │
                      ▼
               Report History
                      │
                      ▼
                React Frontend
                      │
                      ▼
                 User Report
```

---

# 💡 Why SQLite?

SQLite was selected because PalmAI is a lightweight application and SQLite provides:

- Simple setup
- No separate database server
- Local database file
- SQL relational database
- Easy integration with Node.js
- Low configuration overhead
- Good performance for small applications

For a large production application with many concurrent users, a server-based database such as PostgreSQL or MySQL may be more appropriate.

---

# 🔮 Future Improvements

Possible future improvements:

- Cloud image storage
- Production database migration
- PDF report generation
- Email report sharing
- Admin Dashboard
- Payment Integration
- Docker Deployment
- CI/CD Pipeline
- Cloud Deployment
- Advanced AI prompts
- Improved image preprocessing
- User profile management
- Report export
- Analytics Dashboard

---

# 👨‍💻 Author

## Yash Shirude

PG-DAC | C-DAC Bangalore

BE Computer Engineering

### Technical Skills

```text
Java
Spring Boot
REST APIs
JavaScript
React.js
Node.js
Express.js
MySQL
MongoDB
SQLite
HTML5
CSS3
Git
GitHub
Postman
Docker
```

---

# 📌 GitHub Repository

This repository contains the complete PalmAI project including the frontend and backend source code.

```text
Frontend → React.js
Backend  → Node.js + Express.js
Database → SQLite
AI       → Google Gemini API
```

---

# 🎯 Learning Outcomes

This project provided practical experience in:

- Full-Stack Web Development
- React.js Development
- Node.js and Express.js
- REST API Development
- JWT Authentication
- Password Hashing
- Database Management
- SQLite Integration
- Image Upload Handling
- Multer
- Base64 Image Processing
- Multimodal AI Integration
- Google Gemini API
- Prompt Engineering
- Structured JSON Generation
- API Integration
- Backend Security
- Error Handling
- Frontend → Backend Communication
- Git and GitHub
- Postman API Testing

---

# ⚠️ Disclaimer

PalmAI is intended for entertainment and reflective purposes.

Palm reading interpretations generated by AI should not be considered scientific predictions or professional medical, financial, legal, or other professional advice.

AI-generated results may not always be accurate.

---

# ⭐ Project Highlights

PalmAI demonstrates practical implementation of:

- Full-Stack Web Development
- REST API Development
- JWT Authentication
- Password Security
- Database Management
- Image Upload Processing
- Base64 Encoding
- Multimodal AI Integration
- Google Gemini API
- Prompt Engineering
- Structured JSON Generation
- API Integration
- Backend Security
- Rate Limiting
- Error Handling
- SQLite Database
- React Frontend
- Node.js + Express Backend
- Git and GitHub
- Postman API Testing

---

## ⭐ Project Summary

PalmAI combines modern web development with multimodal artificial intelligence to create an end-to-end palm image analysis application.

The application demonstrates how a React frontend can communicate with a Node.js and Express backend, process uploaded images, send multimodal requests to the Gemini API, receive structured JSON results, store reports in SQLite, and display the generated analysis through a user-friendly interface.

## 🚀 End-to-End Technology Stack

```text
Frontend
   ↓
React.js + JavaScript
   ↓
Axios / REST APIs
   ↓
Node.js + Express.js
   ↓
JWT + bcryptjs
   ↓
Multer + Image Validation
   ↓
Base64 Image Processing
   ↓
Google Gemini Multimodal API
   ↓
Structured JSON Response
   ↓
better-sqlite3
   ↓
SQLite Database
   ↓
Report History
   ↓
React Report UI
```

---

## ⭐ If you find this project useful, consider giving the repository a star.




