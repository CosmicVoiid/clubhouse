const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.clubhouse_get = (req, res) => {
	res.render("clubhouse", { title: "Clubhouse" });
};
