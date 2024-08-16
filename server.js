// index.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const port = 3001;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
