const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

connectDB(); // ✅ MongoDB connect

app.use(cors());
app.use(express.json());

// routes
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Review API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server started on port", PORT);
});
