//function for storing hashed password into database

const Password = require("./models/password");
const bcrypt = require("bcryptjs");

const initilizePassword = (passwordName, password) => {
	bcrypt.hash(password, 10, (err, hashedPassword) => {
		if (err) {
			console.log(err);
			return;
		}
		const password = new Password({
			type: passwordName,
			password: hashedPassword,
		}).save((err) => {
			if (err) {
				console.log(err);
				return;
			}
		});
	});
};

module.exports = initilizePassword;
