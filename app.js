import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middleware/error.js";

// Load environment variables
config({ path: "./config/config.env" });

const app = express();

const allowedOrigins = [
  "https://job-xpress-job-portal-frontend.vercel.app",
  "https://job-xpress-job-portal-frontend-etor6okso.vercel.app"
];

// ✅ CORS Middleware (Fixing CORS issues)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  // Preflight request handling
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Additional CORS Middleware (Prevents errors)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database Connection
dbConnection();

// Global Error Handler
app.use(errorMiddleware);

export default app;
