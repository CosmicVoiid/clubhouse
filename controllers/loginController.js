const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.login_get = (req, res) => {
	res.render("login");
};
