// External requires
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

// Routes used
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Creating Express application
const app = express();

// Connection to database
mongoose
  .connect(
    "mongodb+srv://Administrator:Admin34@oc-p6-piiquante.hkwov.mongodb.net/Oc-P6-Piiquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Parsing req using Express method
app.use(express.json({limit: "1kb"}));


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

// Use of routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
