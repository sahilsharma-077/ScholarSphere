require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Connect database
connectDB();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("ScholarSphere backend running");
});

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected data accessed successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
