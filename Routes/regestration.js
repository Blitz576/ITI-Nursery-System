//import from module
const express = require("express");

//validation
const registerValidator = require("../Middlewares/mainValidator") //regestration validator
const validationRestult = require("../Middlewares/validatorResult") //validation result

const register = require("../Controllers/teacherController") //for teacher insert

const router = express.Router(); //route object



router.route("/register").post(registerValidator.insertValidator,validationRestult,register.insertTeacher)
