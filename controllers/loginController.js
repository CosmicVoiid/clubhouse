const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.login_get = (req, res) => {
	res.render("login", { title: "Log In", errors: null });
};

exports.login_post = [
	body("username", "Username must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("password", "Password must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render("login", { title: "Log In", errors: errors.array() });
			return;
		}

		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/login",
			failureFlash: true,
		})(req, res, next);
	},
];
