// External requires
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schema for a user using mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Verifying if unique with plugin
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
