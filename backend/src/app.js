const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite dev server URL
  credentials: true // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

module.exports = app;
