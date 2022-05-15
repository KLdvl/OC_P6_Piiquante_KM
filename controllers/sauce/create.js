// Model used
const Sauce = require("../../models/Sauce");

// Method for creating a new sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch(error => res.status(400).json({ error }));
};
