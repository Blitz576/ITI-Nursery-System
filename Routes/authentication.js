const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticationController");

router.route("/login").post(login);

module.exports = router;
