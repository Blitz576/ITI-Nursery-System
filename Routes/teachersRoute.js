//import modules
const express = require("express"); //express

//middleWares
//const upload = require("../Middlewares/imageBuffer"); //image uploader
//Controllers
const teacherCont = require("../Controllers/teacherController");

//Valedations
const {
  insertValidator,
  updateValidator,
} = require("../Middlewares/mainValidator");
const validationResult = require("../Middlewares/validatorResult");

//******Creating routes*******
const router = express.Router(); // routes Object
router
  .route("/teachers")
  .get(teacherCont.getAllTeachers)
  .post(insertValidator ,validationResult, teacherCont.insertTeacher)
  .put(updateValidator,validationResult, teacherCont.updateTeacher)
  .delete(teacherCont.deleteTeacher);

router.route("/teachers/:id").get(teacherCont.getIdTeacher); //get the selected teacher

router.route("/teachers/supervisors").get(teacherCont.getSupervisors); //get all the supervisors

router.route("/teachers/changePassword").post(teacherCont.changePassword); //change the password
//export route object
module.exports = router;
