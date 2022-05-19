// module.exports = (req, res, next) => {
//
//   const fieldsRegex = /^[a-zA-Z0-9 _.,!()&]+$/;
//
//   const {name, manufacturer, description, mainPepper} = JSON.parse(req.body.sauce);
//
//   if(
//     fieldsRegex.test(name) &&
//     fieldsRegex.test(manufacturer) &&
//     fieldsRegex.test(description) &&
//     fieldsRegex.test(mainPepper)
//   ) {
//   next();
//   } else {
//     return res
//       .status(500)
//       .json({ error: "Certains champs contiennent des caractères invalides" });
//   }
// }
// External requires
const fs = require("fs");

module.exports = async (req, res, next) => {
  try {

    const fieldsRegex = /^[a-zA-Z0-9 _.,!()&]+$/;

    const {name, manufacturer, description, mainPepper} = await JSON.parse(req.body.sauce);
      if(fieldsRegex.test(name) &&
      fieldsRegex.test(manufacturer) &&
      fieldsRegex.test(description) &&
      fieldsRegex.test(mainPepper)) {
        next();
      } else {
        fs.unlink(`images/${req.file.filename}`, (err) => {
          if (err) {
            throw err;
          }
          res.status(500).json({message: "Certains champs contiennent des caractères invalides"})
        });
      }
  } catch(err) {
    res.status(500).json({message: "Certains champs contiennent des caractères invalides"})
  }
}
