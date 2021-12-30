const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	status: { type: String, required: true },
});

UserSchema.virtual("full_name").get(() => {
	return first_name + " " + last_name;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
