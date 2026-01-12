const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");


// 載入 routes
const competitionRoutes = require("./routes/competitionRoutes");


// 環境變數
dotenv.config();

// 連線資料庫
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 測試用首頁
app.get("/", (req, res) => {
  res.json({
    success: true,
    data: {},
    message: "API is running"
  });
});

// API routes
app.use("/api/competitions", competitionRoutes);
app.use("/api/registrations", registrationRoutes);


module.exports = app;
