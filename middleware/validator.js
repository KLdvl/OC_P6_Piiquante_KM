// External requires
const {body, validationResult} = require("express-validator");

// Function to hold validation rules
const userValidationRules = () => {
  return [
    // Username must be an email
    body('email').isEmail(),
    // Password conditions
    body('password').isStrongPassword({minLength: 6})
  ]
}

// Function that does the validation
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

  return res.status(422).json({errors: extractedErrors})
}

module.exports = {userValidationRules, validate};
