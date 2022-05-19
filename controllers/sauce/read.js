// Model used
const Sauce = require("../../models/Sauce");

// Method for getting all the sauces
// exports.readSauces = (req, res, next) => {
//   Sauce.find()
//     .then(sauce => res.status(200).json(sauce))
//     .catch(error => res.status(400).json({error}));
// };

exports.readSauces = async (req, res) => {
  try {
    const sauce = await Sauce.find({})
    res.status(200).json(sauce);
  } catch(err) {
    res.status(500).json({error : err})
  }
}

// // Method for getting one sauce using Id
// exports.readOneSauce = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then(sauce => res.status(200).json(sauce))
//     .catch(error => res.status(404).json({error}));
// };

exports.readOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findById({_id: req.params.id}).exec();
    res.status(200).json({sauce})
  } catch(err) {
    res.status(404).json({error: err})
  }
}

