const Message = require("../models/message");
const User = require("../models/user");
const Password = require("../models/password");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.clubhouse_get = (req, res, next) => {
	Message.find()
		.populate("user")
		.exec((err, result) => {
			if (err) return next(err);
			res.render("clubhouse", { title: "Clubhouse", messages: result });
		});
};

exports.clubhouse_post = (req, res, next) => {
	Message.findById(req.body.deleteMessageId).exec((err, results) => {
		if (err) return next(err);
		Message.findByIdAndRemove(req.body.deleteMessageId, (err) => {
			if (err) return next(err);
			res.redirect("/");
		});
	});
};

exports.membership_get = (req, res) => {
	res.render("membership", { title: "Membership", errors: null });
};

exports.membership_post = [
	body("password", "Password must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty) {
			res.render("membership", { title: "Membership", errors: errors.array() });
			return;
		}

		Password.findOne({ type: "member" }, (err, password) => {
			if (err) return next(err);
			bcrypt.compare(req.body.password, password.password, (err, result) => {
				if (result) {
					const user = new User({
						first_name: res.locals.currentUser.first_name,
						last_name: res.locals.currentUser.last_name,
						username: res.locals.currentUser.username,
						password: res.locals.currentUser.password,
						status: "member",
						_id: res.locals.currentUser._id,
					});

					User.findByIdAndUpdate(
						res.locals.currentUser._id,
						user,
						{},
						(err, updatedUser) => {
							if (err) return next(err);
							res.redirect("/");
						}
					);
				} else {
					const wrongPassword = [{ msg: "Incorrect Password" }];
					res.render("membership", {
						title: "Membership",
						errors: wrongPassword,
					});
					return;
				}
			});
		});
	},
];

exports.admin_get = (req, res) => {
	res.render("admin", { title: "Admin", errors: null });
};

exports.admin_post = [
	body("password", "Password must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty) {
			res.render("admin", { title: "Admin", errors: errors.array() });
			return;
		}

		Password.findOne({ type: "admin" }, (err, password) => {
			if (err) return next(err);
			bcrypt.compare(req.body.password, password.password, (err, result) => {
				if (result) {
					const user = new User({
						first_name: res.locals.currentUser.first_name,
						last_name: res.locals.currentUser.last_name,
						username: res.locals.currentUser.username,
						password: res.locals.currentUser.password,
						status: "admin",
						_id: res.locals.currentUser._id,
					});

					User.findByIdAndUpdate(
						res.locals.currentUser._id,
						user,
						{},
						(err, updatedUser) => {
							if (err) return next(err);
							res.redirect("/");
						}
					);
				} else {
					const wrongPassword = [{ msg: "Incorrect Password" }];
					res.render("admin", {
						title: "Admin",
						errors: wrongPassword,
					});
					return;
				}
			});
		});
	},
];
