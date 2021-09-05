// Importing Modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Importing Routes
import authRoute from "./routes/AuthRoutes.js";
import postRoute from "./routes/PostRoutes.js";
import verifyToken from "./routes/VerifyToken.js";

// Setting up express and dotenv
const app = express();
dotenv.config();

// Setting up middleware
app.use(express.json());
app.use(cors());

// Connecting to the database
mongoose
	.connect(process.env.db_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(process.env.PORT || 5000, () => {
			console.log(
				`Server has started : http://localhost:${process.env.PORT}`
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Route Parameters
app.get("/", (req, res) => {
	res.redirect("/api/v1");
});

app.get("/api/v1", (req, res) => {
	res.send({ title: "HI" });
});

app.use("/api/v1/user", authRoute);
app.use("/api/v1/post", verifyToken, postRoute);
