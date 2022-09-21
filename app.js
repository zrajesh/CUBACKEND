const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
require('dotenv').config();
const cors = require("cors");
// Import routes
const authRoutes = require("./routes/auth");
// Calling express method
const app = express();

// Port
const PORT = process.env.PORT || 8000;

// DB connection
mongoose.connect(process.env.DB)
    .then(() => console.log("DB CONNECTED"))
    .catch(err => console.log("DB CONNECTION ERROR: ", err))

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", authRoutes);

// Listening to port
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
