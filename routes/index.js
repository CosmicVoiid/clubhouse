const express = require("express");
const router = express.Router();
const clubhouseController = require("../controllers/clubhouseController");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const messageController = require("../controllers/messageController");

router.get("/", (req, res) => {
	res.redirect("/clubhouse");
});

router.get("/clubhouse", clubhouseController.clubhouse_get);
router.post("/clubhouse", clubhouseController.clubhouse_post);

router.get("/membership", clubhouseController.membership_get);
router.post("/membership", clubhouseController.membership_post);

router.get("/admin", clubhouseController.admin_get);
router.post("/admin", clubhouseController.admin_post);

router.get("/login", loginController.login_get);
router.post("/login", loginController.login_post);
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.get("/signup", signupController.signup_get);
router.post("/signup", signupController.signup_post);

router.get("/create-message", messageController.create_message_get);
router.post("/create-message", messageController.create_message_post);

module.exports = router;
