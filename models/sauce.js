// External requires
const mongoose = require("mongoose");

// Schema for a sauce using mongoose
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    minlength: [2, "Le nom renseigné est trop court"],
    maxlength: [30, "Le nom renseigné est trop long"],
    required: [true, "Veuillez renseigner un nom"] },
  manufacturer: {
    type: String,
    minlength: [2, "Le nom de la marque est trop court"],
    maxlength: [30, "Le nom de la marque est trop long"],
    required: [true, "Veuillez renseigner une marque"] },
  description: {
    type: String,
    maxlength: [250, "La description est trop longue"],
    required: [true, "Veuillez renseigner une description"] },
  mainPepper: { type: String,
    maxlength: [50, "Le nom de l'ingrédient est trop long"],
    required: [true, "Veuillez renseigner un ingrédient"] },
  imageUrl: {
    type: String,
    required: [true, "Veuillez ajouter une image"] },
  heat: {
    type: Number,
    required: [true, "Veuillez sélectionner une valeur"] },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
