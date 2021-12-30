const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", (req, res) => {
	res.redirect("/login");
});

router.get("/login", loginController.login_get);

module.exports = router;
