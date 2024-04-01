//import from module
const express = require("express");

const childController = require("./../Controllers/childController"); //controller
//validation
const childValidation = require("../Middlewares/childValidation"); //validator
const validatorResult = require("../Middlewares/validatorResult"); //validationresult

const router = express.Router(); //route object

router
  .route("/child")
  /**
   * @swagger
   * /child:
   *   get:
   *     summary: Get all children
   *     responses:
   *       200:
   *         description: Successful operation
   *       500:
   *         description: Internal server error
   */
  .get(childController.getAllChild)
  /**
   * @swagger
   * /child:
   *   post:
   *     summary: Insert a new child
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *               age:
   *                 type: integer
   *               level:
   *                 type: string
   *               address:
   *                 type: object
   *                 properties:
   *                   city:
   *                     type: string
   *                   street:
   *                     type: string
   *                   building:
   *                     type: string
   *     responses:
   *       201:
   *         description: Child inserted successfully
   *       500:
   *         description: Internal server error
   */
  .post(childValidation.insert, validatorResult, childController.insert)
  /**
   * @swagger
   * /child:
   *   patch:
   *     summary: Update an existing child
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               _id:
   *                 type: integer
   *               fullName:
   *                 type: string
   *               age:
   *                 type: integer
   *               level:
   *                 type: string
   *               address:
   *                 type: object
   *                 properties:
   *                   city:
   *                     type: string
   *                   street:
   *                     type: string
   *                   building:
   *                     type: string
   *     responses:
   *       200:
   *         description: Child updated successfully
   *       404:
   *         description: Child not found
   *       500:
   *         description: Internal server error
   */
  .patch(childValidation.update, validatorResult, childController.update);

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Child not found
 *       500:
 *         description: Internal server error
 */
router.route("/child/:id").get(childController.getchildById); //specific child id

module.exports = router;
