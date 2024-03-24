//import modules
const express = require("express");

//controller
const classController = require("../Controllers/classController");

//validations
const classValidation = require("../Middlewares/classValidation");
const validatorResult = require("../Middlewares/validatorResult");

const router = express.Router(); //route object

//******Creating routes*******
router
  .route("/class")
  .get(classController.getAllclass)
  .post(classValidation.insert, validatorResult, classController.insert)
  .patch(classValidation.update, validatorResult, classController.update);

router.route("/class/:id").get(classController.getclassById);
router.route("/class/child/:id").get(classController.getclasschildById); //get specific child
router.route("/class/teacher/:id").get(classController.getclassteacherById); //get specific teacher

//exprot route object
module.exports = router;
