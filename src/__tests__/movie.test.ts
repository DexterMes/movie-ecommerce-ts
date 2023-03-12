import { Request, Response } from "express";
import { getAllMovies, getMoviesByGenre, getMoviesByName, getMoviesByPeople, getMoviesByYear } from "../movie.controller";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

let token: string =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthYmluIiwiaWF0IjoxNjc4NjE4NTUyLCJleHAiOjE2Nzg2NDM3NTJ9.3_CDLSmU3v8hAisdLek33D4KWtEqZr7Gq5O15JOa3kQ";

beforeEach(() => {
	mockRequest = {};
	mockResponse = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis(),
	};
});

test("Test getAllMovies to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
		};
		await getAllMovies(mockRequest as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test getMoviesByYear to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { year: "2000" },
		};
		await getMoviesByYear(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test getMoviesByYear to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { year: "00" },
		};
		await getMoviesByYear(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});

test("Test getMoviesByName to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { name: "Green Lantern" },
		};
		await getMoviesByName(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test getMoviesByName to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { year: "00" },
		};
		await getMoviesByName(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});

test("Test getMoviesByGenre to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { genre: "Comedy" },
		};
		await getMoviesByGenre(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test getMoviesByGenre to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { genre: "test" },
		};
		await getMoviesByGenre(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});

test("Test getMoviesByPeople to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { name: "Ryan Reynolds" },
		};
		await getMoviesByPeople(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test getMoviesByPeople to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { name: "test" },
		};
		await getMoviesByPeople(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});
