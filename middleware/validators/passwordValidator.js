
//
// // Function to hold validation rules for sauce inputs
// const sauceValidationRules = () => {
//   return [
//     body('userId').escape(),
//     body('name').escape(),
//     body('manufacturer').escape(),
//     body('description').escape(),
//     body('mainPepper').escape(),
//     body('imageUrl').blacklist('\\[\$`|*\]'),
//     body('heat').toInt(),
//     body('likes').toInt(),
//     body('dislikes').toInt(),
//     body('usersLiked').escape(),
//     body('usersDisliked').escape()
//   ]
// }
//
// // Function that does the validation
// const validate = (req, res, next) => {
//   const errors = validationResult(req)
//   if(errors.isEmpty()) {
//     return next()
//   }
//   const extractedErrors = []
//   errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
//
//   return res.status(422).json({ message: extractedErrors})
// }
//
// module.exports = {userValidationRules, sauceValidationRules, validate};

const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)                                      // Minimum length 8
  .is().max(12)                                    // Maximum length 12
  .has().uppercase()                                     // Must have uppercase letter
  .has().lowercase()                                     // Must have lowercase letter
  .has().digits(2)                                 // Must have at least 2 digits
  .has().not().spaces()                                  // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123'])     // Blacklist these values

module.exports = (req, res, next) => {
  if(passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(400)
      .json({error : `Le mot de passe doit contenir ${passwordSchema.validate('req.body.password', {list: true})}`})
  }
}
