//import from module
const express = require("express");

const childController = require("./../Controllers/childController"); //controller
//validation
const childValidation = require("../Middlewares/childValidation"); //validator 
const validatorResult = require("../Middlewares/validatorResult"); //validationresult

const router = express.Router(); //route object

router
  .route("/child")
  .get(childController.getAllChild)
  .post(childValidation.insert, validatorResult, childController.insert)
  .patch(childValidation.update, validatorResult, childController.update);

router.route("/child/:id").get(childController.getchildById); //specific child id

module.exports = router;
