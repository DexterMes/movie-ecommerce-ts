import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMovies: RequestHandler = async (req, res) => {
	try {
		// Find the first 200 movies, change take value for more
		const movies = await prisma.movie.findMany({
			take: 200,
		});

		// Send a success message
		return res.json({
			movies,
			message: "Movies Retrived Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};

export const getFilteredMovies: RequestHandler = async (req, res) => {
	try {
		// Get the genre to be filered
		const { name, genre, year, people } = req.query;
		let movies = [];

		if (!name && !genre && !year && !people) return res.json({ error: "No query provided" });

		if (genre) {
			// Check to see if the movie by in that exists or not
			const moviesByGenre = await prisma.movie.findMany({
				where: { genres: { contains: String(genre) } },
				take: 50,
			});

			// If no movie exists send and error message
			if (!moviesByGenre.length) return res.json({ error: "No movie by that genre" });
			movies.push(moviesByGenre);
		}

		if (year) {
			// Check if there is movie of that year
			const moviesByYear = await prisma.movie.findMany({
				where: {
					startYear: { equals: Number(year) },
				},
				take: 200,
			});

			// If no movies then send an error messange
			if (!moviesByYear.length) return res.json({ error: "No movie by in that year" });
			movies.push(moviesByYear);
		}

		if (name) {
			// Check to see if the movie by that name exists or not
			const moviesByName = await prisma.movie.findMany({
				where: {
					OR: [
						{
							primaryTitle: { equals: String(name) },
						},
						{
							originalTitle: { equals: String(name) },
						},
					],
				},
				take: 200,
			});

			// if No movie exist by that name the send an error message
			if (!moviesByName.length) return res.json({ error: "No movie by that name" });
			movies.push(moviesByName);
		}

		if (people) {
			// Check if the name exist or not and select to show only the movie information
			const moviesByPeople = await prisma.name.findMany({
				where: { primaryName: String(people) },
				select: {
					primaryName: true,
					principals: {
						select: {
							movie: true,
						},
					},
				},
			});
			// Check if there is people who exist in movies
			if (!moviesByPeople.length) return res.json({ error: "No such actors" });
			movies.push(moviesByPeople);
		}

		// Send a success message
		return res.json({
			movies: movies[0],
			message: "Movies Retrived Sucessfully!",
		});
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
};
