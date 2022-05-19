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



exports.readOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.find({_id: req.params.id}).exec();

=======
// Method for getting one sauce using Id

exports.readOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({_id: req.params.id}).exec();
>>>>>>> 0c0a4d367c9b04c2b1abf72576d25a15bf87cd44
    res.status(200).json(sauce)
  } catch(err) {
    res.status(404).json({error: err})
  }
}

