//import from module
const { body } = require("express-validator");

exports.insert = [
  body("fullname")
    .isString()
    .isLength({ min: 3 })
    .withMessage("fullName must be at least 3 characters long"),

  body("age").isInt().withMessage("age must be a number"),

  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of PreKG,KG1,KG2"),

  body("address").isObject().withMessage("address must be an object"),

  body("address.city")
    .isLength({ min: 3 })
    .withMessage("city must be at least 3 characters long"),
];

exports.update = [
  body("fullname")
    .isString()
    .isLength({ min: 3 })
    .withMessage("fullName must be at least 3 characters long"),

  body("age").isInt().withMessage("age must be a number"),

  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level must be one of PreKG,KG1,KG2"),

  body("address").isObject().withMessage("address must be an object"),

  body("address.city")
    .isLength({ min: 3 })
    .withMessage("city must be at least 3 characters long"),
];
