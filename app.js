if (!process.env.NODE_ENV === "production") require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const indexRouter = require("./routes/index");

//initilize hashed passwords into database
//const initilizePassword = require("./initilizePassword");

//create server
const app = express();

//assign port number
const port = process.env.PORT || 3000;

//connect to mongodb
const dev_dbURI = process.env.DEV_MONGODB_URI;
const dbURI = process.env.MONGODB_URI || dev_dbURI;

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("Connected to MongoDb");
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});

//view engine
app.set("view engine", "ejs");

//passport validation and cookie storage
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) return done(err);
			if (!user)
				return done(null, false, { message: "Username does not exist" });
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Incorrect password" });
				}
			});
		});
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

//middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET || process.env.SESSION_SECRET_DEV,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRouter);

app.use((req, res) => {
	res.status(404).send({ title: "404 Page Not Found" });
});
