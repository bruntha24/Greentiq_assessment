// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const companyRoutes = require("./routes/Company");
const saleRoutes = require("./routes/saleRoutes");
const requestRoutes = require("./routes/requestRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const rtsRoutes = require("./routes/rts");
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allow React frontend
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/company", companyRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/company/activities", require("./routes/activity"));
app.use("/api/company/projects",projectRoutes);
app.use("/api/company/rts", rtsRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
