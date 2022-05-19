// Model used
const Sauce = require("../../models/Sauce");

// Method for getting all the sauces
exports.readSauces = async (req, res) => {
  try {
    const sauce = await Sauce.find({})
    res.status(200).json(sauce);
  } catch(err) {
    res.status(500).json({error : err})
  }
}

// Method for getting one sauce selected by Id
exports.readOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findById({_id: req.params.id}).exec();

    res.status(200).json(sauce)
  } catch(err) {
    res.status(404).json({error: err})
  }
}

