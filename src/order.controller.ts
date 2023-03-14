import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const placeOrder: RequestHandler = async (req, res) => {
	try {
		// Extract user data
		const { username, cart } = req.user;

		// Create an instance of order
		const order = await prisma.order.create({
			data: {
				username,
				movies: cart,
			},
		});

		// Send a success message
		return res.json({
			order,
			message: "Movie Ordered Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};

export const getOrders: RequestHandler = async (req, res) => {
	try {
		// Extract user data
		const { username } = req.user;

		// Find all the orders of that user
		const orders = await prisma.order.findMany({ where: { username } });

		// Send a success message
		return res.json({
			orders,
			message: "Order retrived Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};

export const addToCart: RequestHandler = async (req, res) => {
	try {
		// Extract user data
		const { username } = req.user;

		// Extract user information
		const { tconst } = req.params;

		// Check if the movie is correct or not else send error messsage
		const movie = await prisma.movie.findUnique({ where: { tconst } });
		if (!movie) return res.json({ error: "The movie id is incorrect" });

		// Check if the movie is already in cart or not
		const inCart = await prisma.user.findMany({
			where: {
				username,
				cart: {
					has: tconst,
				},
			},
		});
		// If yes then send an error message
		if (inCart.length) return res.json({ error: "This movie is already in your cart" });

		// Add that movie in the user's cart
		const cart = await prisma.user.update({ where: { username }, data: { cart: { push: tconst } } });

		// Send a success message
		return res.json({
			cart: cart.cart,
			message: "Movie Added To Cart Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};

export const removeFromCart: RequestHandler = async (req, res) => {
	try {
		// Extract user data
		const user = req.user;

		// Extract user information
		const { tconst } = req.params;

		// Check if the movie is correct or not else send error messsage
		const movie = await prisma.movie.findUnique({ where: { tconst } });
		if (!movie) return res.json({ error: "The movie id is incorrect" });

		// Check if the movie is already in cart or not
		const inCart = await prisma.user.findMany({
			where: {
				username: user.username,
				cart: {
					has: tconst,
				},
			},
		});
		// If no then send an error message
		if (!inCart.length) return res.json({ error: "This movie is not in your cart" });

		// Remove that movie in the user's cart
		const cart = await prisma.user.update({
			where: { username: user.username },
			data: { cart: { set: user.cart.filter((item) => item !== tconst) } },
		});

		// Send a success message
		return res.json({
			cart: cart.cart,
			message: "Movie Removed Form Cart Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};

export const collectOrders: RequestHandler = async (req, res) => {
	try {
		// Extract user data
		const { username } = req.user;

		// Extract user information
		const { id } = req.params;

		// Find if that order is of that user
		const checkOrders = await prisma.order.findMany({ where: { username, id: Number(id) } });

		//Send error if the user has not ordered yet
		if (!checkOrders.length) return res.json({ error: "You have not ordered this movie yet" });

		//Update the status to collected
		const order = await prisma.order.update({ where: { id: Number(id) }, data: { status: { set: "COLLECTED" } } });

		// Send a success message
		return res.json({
			order,
			message: "Order Collected Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};
