import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { PrismaClient, User, Role } from "@prisma/client";
import jwt from "jsonwebtoken";

// Init Prisma Client
const prisma = new PrismaClient();

export const registerUser: RequestHandler = async (req, res) => {
	try {
		// Extract user-inputted information from request object
		const newUser: User = req.body;

		// Check whether the username is already registered or not
		const userWithSameUsername = await prisma.user.findUnique({
			where: {
				username: newUser.username,
			},
		});

		// If username is already regsitered, return a message
		if (userWithSameUsername != null) {
			return res.status(409).json({ error: "This username already exists" });
		}
		// Check if the password is strong enough
		if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(newUser.password))
			// Return a message is password is not strong enough
			return res.status(400).json({ error: "Password not strong enough" });

		// Create an instance of User
		const user = await prisma.user.create({
			data: {
				username: newUser.username,
				password: await bcrypt.hash(newUser.password, 10),
				role: Role.CUSTOMER,
			},
		});

		// Send a success message
		return res.json({
			message: "User Registration Complete :)",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};

export const handleLogin: RequestHandler = async (req, res) => {
	try {
		// Extract user inputs
		const { username, password } = req.body;

		// Find if the user exists
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});
		// If user doesnot exist send a error message
		if (!user)
			return res.status(401).json({
				error: "Invalid login credentials",
			});

		// Check if the password is correct
		const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);

		//If the user does not exist, send an error message
		if (!isPasswordCorrect)
			return res.status(401).json({
				error: "Invalid login credentials",
			});

		// If everything is okay, sign a token with the user's information
		const token = jwt.sign({ username }, <string>process.env.JWT_SECRET, { expiresIn: "7h" });

		// Return a success message with the token and other useful information
		return res.json({
			token,
			role: user.role,
			message: "Login Successful!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};
