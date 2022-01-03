const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res, next) => {
	res.render("create-message", { title: "Create Message", errors: null });
};

exports.create_message_post = [
	body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
	body("message", "Message must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		const message = new Message({
			title: req.body.title,
			description: req.body.message,
			user: res.locals.currentUser,
		});

		if (!errors.isEmpty()) {
			res.render("create-message", {
				title: "Create Message",
				errors: errors.array(),
				message: message,
			});
			return;
		}

		message.save((err) => {
			if (err) return next(err);
			res.redirect("/");
		});
	},
];
