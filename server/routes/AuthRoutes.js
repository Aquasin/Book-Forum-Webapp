// Importing Modules
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
	// Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res.status(400).send({ title: "Email already exist" });
	}

	// Hashing the Passwords to be safe
	const salt = await bcrypt.genSalt(parseInt(process.env.bcrypt_SALT));
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new user
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	});
	try {
		const savedUser = await user.save();
		res.send({ user: savedUser });
	} catch (err) {
		res.status(400).send({ title: err });
	}
});

// Login
router.post("/login", async (req, res) => {
	// Checking if the user is already in the database

	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send({ title: "Email not found" });
	}

	// Checking Passwords
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) {
		return res.status(400).send({ title: "Invalid Password" });
	}

	// Craete and assign a token
	const token = jwt.sign(
		{ username: user.username },
		process.env.jwt_SECRET_KEY
	);
	res.header("auth-token", token).send({
		token: token,
		username: user.username,
	});
});

export default router;
