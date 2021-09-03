import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		return res.status(401).send({ title: "Access Denied" });
	}

	try {
		const verified = jwt.verify(token, process.env.jwt_SECRET_KEY);
		req.token = verified;
		next();
	} catch (err) {
		res.status(400).send({ title: "Invalid Token" });
	}
};

export default verifyToken;
