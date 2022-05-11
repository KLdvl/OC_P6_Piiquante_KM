// External requires
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Security features
const mongoSanitize = require("express-mongo-sanitize");
const toobusy = require("toobusy-js");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const dotenv = require("dotenv").config('./.env');

// Log features
const bunyan = require("bunyan");

// Creating log for errors
const log = bunyan.createLogger({name: "HotTakes"});

// Routes used
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Creating Express application
const app = express();

// Using helmet to secure headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Connection to database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Parsing req using Express method
app.use(express.json({limit: "1kb"}));

// Block request when server is too busy
app.use(function(req,res,next) {
  if(toobusy()) {
    res.status(503).json({ message: "I'm busy right now, sorry."});
  } else {
    next();
  }
});

// Limit requests for a period of time
const limiter = rateLimit({
  windowMS: 15 * 60 * 1000, //15 minutes
  max: 100, // Limit each IP to 100 requests per "window"
  standardHeaders: true,
  legacyHeaders: false,
})

// Setting CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Prevention of NoSQL injection
app.use(mongoSanitize());
app.use(limiter);

// Use of routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
