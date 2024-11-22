const { body, validationResult } = require("express-validator");
const validate = {};

validate.firstNameRules = () => {
    return [
        body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a valid first name."), // on error this message is sent.
    ]
}

validate.checkFirstName = async (req, res, next) => {
    const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
}

module.exports = validate;