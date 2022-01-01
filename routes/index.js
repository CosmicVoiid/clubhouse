const express = require("express");
const router = express.Router();
const clubhouseController = require("../controllers/clubhouseController");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");

router.get("/", (req, res) => {
	res.redirect("/clubhouse");
});

router.get("/clubhouse", clubhouseController.clubhouse_get);

router.get("/login", loginController.login_get);

router.get("/signup", signupController.signup_get);
router.post("/signup", signupController.signup_post);

module.exports = router;
