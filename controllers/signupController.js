const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, check, validationResult } = require("express-validator");

exports.signup_get = (req, res) => {
	res.render("signup", { title: "Sign Up", errors: null });
};

exports.signup_post = [
	//sanitation and validation
	body("firstname", "First Name must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("lastname", "Last Name must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("username", "Username must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("password", "Password must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("password-confirm", "Password confirmation must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	check(
		"password-confirm",
		"Password confirmation must be the same value as password"
	).custom((value, { req }) => value === req.body.password),

	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render("signup", { title: "Sign Up", errors: errors.array() });
			return;
		}

		bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
			if (err) return next(err);
			const user = new User({
				first_name: req.body.firstname,
				last_name: req.body.lastname,
				username: req.body.username,
				password: hashedPassword,
				status: "non-member",
			}).save((err) => {
				if (err) {
					return next(err);
				}
				res.redirect("/");
			});
		});
	},
];
