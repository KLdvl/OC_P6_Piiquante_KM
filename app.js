const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://Administrator:Admin34@oc-p6-piiquante.hkwov.mongodb.net/Oc-P6-Piiquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

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

app.post("/api/auth/signup", (req, res, next) => {
  console.log("post signup");
  next();
});

app.post("/api/auth/login", (req, res, next) => {
  console.log("post login");
  next();
});

app.get("/api/sauces", (req, res, next) => {
  console.log("get sauces");
  next();
});

app.get("/api/sauces/:id", (req, res, next) => {
  console.log("get single sauce");
  next();
});

app.post("/api/sauces", (req, res, next) => {
  console.log("post sauce");
  next();
});

app.put("/api/sauces/:id", (req, res, next) => {
  console.log("put sauce");
  next();
});

app.delete("/api/sauces/:id", (req, res, next) => {
  console.log("delete sauce");
  next();
});

app.post("/api/sauces/:id/like", (req, res, next) => {
  console.log("like sauce");
  next();
});

module.exports = app;
