require("dotenv").config();

console.log("ENV FILE LOADED");
console.log("OPENAI KEY =", process.env.OPENAI_API_KEY ? "FOUND" : "NOT FOUND");
console.log("MODEL =", process.env.OPENAI_MODEL);

const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const xss = require("xss-clean");

const { errorHandler, notFound } = require("./middlewares/errorHandler");
const { apiLimiter } = require("./middlewares/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const historyRoutes = require("./routes/historyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin"
        }
    })
);

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(xss());

app.use(
    morgan(
        process.env.NODE_ENV === "development"
            ? "dev"
            : "combined"
    )
);

app.use("/api", apiLimiter);

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        message: "PalmAI API Running",

        openai: !!process.env.OPENAI_API_KEY,

        model: process.env.OPENAI_MODEL,

        time: new Date()

    });

});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/report", reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("Server Started");
    console.log("Port :", PORT);
    console.log("--------------------------------");

});