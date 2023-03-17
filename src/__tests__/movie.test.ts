import { Request, Response } from "express";
import { getAllMovies, getFilteredMovies } from "../movie.controller";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

let token: string =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxIiwiaWF0IjoxNjc5MDI3NTgxLCJleHAiOjE2NzkwNTI3ODF9.JjjRJZUqad24gjJ-F8bKMfilhKfdW2dtkY__pC_ZOFM";

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

test("Test getFilteredMovies to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			query: { name: "Space-pigs" },
		};
		await getFilteredMovies(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});
test("Test getFilteredMovies to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			query: { genre: "Comedy" },
		};
		await getFilteredMovies(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});
test("Test getFilteredMovies to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			query: { year: "2000" },
		};
		await getFilteredMovies(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});
test("Test getFilteredMovies to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			query: { people: "Ryan Reynolds" },
		};
		await getFilteredMovies(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ movies: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test getFilteredMovies to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			query: { name: "test", genre: "test", year: "test", people: "test" },
		};
		await getFilteredMovies(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});
