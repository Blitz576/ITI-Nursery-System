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

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher management endpoints
 */

//******Creating routes*******
const router = express.Router(); // routes Object
router
  .route("/teachers")
  .get(teacherCont.getAllTeachers)
  /**
   * @swagger
   * /teachers:
   *   post:
   *     summary: Create a new teacher
   *     description: Create a new teacher with the provided details
   *     tags: [Teachers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *               role:
   *                 type: string
   *                 enum: [admin, teacher]
   *             required:
   *               - fullName
   *               - email
   *               - password
   *               - role
   *     responses:
   *       200:
   *         description: Teacher created successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  .post(insertValidator, validationResult, teacherCont.insertTeacher)
  /**
   * @swagger
   * /teachers/{id}:
   *   put:
   *     summary: Update teacher details
   *     description: Update details of an existing teacher
   *     tags: [Teachers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *               role:
   *                 type: string
   *                 enum: [admin, teacher]
   *             required:
   *               - fullName
   *               - email
   *               - password
   *               - role
   *     responses:
   *       200:
   *         description: Teacher updated successfully
   *       400:
   *         description: Bad request
   *       404:
   *         description: Teacher not found
   *       500:
   *         description: Internal server error
   */
  .put(updateValidator, validationResult, teacherCont.updateTeacher)
  /**
   * @swagger
   * /teachers/{id}:
   *   delete:
   *     summary: Delete teacher
   *     description: Delete an existing teacher
   *     tags: [Teachers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Teacher deleted successfully
   *       404:
   *         description: Teacher not found
   *       500:
   *         description: Internal server error
   */
  .delete(teacherCont.deleteTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Get a teacher by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Teacher not found
 */
router.route("/teachers/:id").get(teacherCont.getIdTeacher); //get the selected teacher

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get supervisors
 *     description: Retrieve a list of all supervisors
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: No supervisors found
 */
router.route("/teachers/supervisors").get(teacherCont.getSupervisors); //get all the supervisors

/**
 * @swagger
 * /teachers/change-password:
 *   post:
 *     summary: Change password
 *     description: Change password of the authenticated teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *             required:
 *               - old_password
 *               - new_password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.route("/teachers/changePassword").post(teacherCont.changePassword); //change the password
//export route object
module.exports = router;
