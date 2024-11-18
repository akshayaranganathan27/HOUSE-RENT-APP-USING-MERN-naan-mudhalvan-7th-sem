// index.js or server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Load environment variables
dotenv.config();

// MongoDB connection URI from .env file
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB
const connectToDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
    throw new Error(`Could not connect to MongoDB: ${err}`);
  }
};

// Call the function to connect to the database
connectToDb();

// Define the port from environment or default to 8000
const PORT = process.env.PORT || 8001;

// Middleware setup
app.use(express.json());
app.use(cors());

// Static folder setup for file uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
