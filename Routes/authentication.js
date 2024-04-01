const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticationController");


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in to the system
 *     description: Log in as admin or teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.route("/login").post(login);

module.exports = router;
