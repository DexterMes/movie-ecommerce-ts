import { Request, Response } from "express";
import { addToCart, getOrders, placeOrder, removeFromCart } from "../order.controller";

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

test("Test addToCart to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { tconst: "tt0116848" },
			user: { username: "Test" },
		};
		await addToCart(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ cart: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		throw error;
	}
});

test("Test addToCart to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { tconst: "Ryan Reynolds" },
			user: { username: "Test" },
		};
		await addToCart(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});

test("Test removeFromCart to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { tconst: "tt0116848" },
			user: { username: "Test" },
		};
		await removeFromCart(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ cart: expect.any(Object), message: expect.any(String) });
	} catch (error) {
		throw error;
	}
});

test("Test removeFromCart to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			params: { tconst: "Ryan Reynolds" },
			user: { username: "Test" },
		};
		await removeFromCart(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});

test("Test placeOrder to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			user: { username: "Test" },
			body: {
				tconst: "tt0116848",
				quantity: 3,
			},
		};
		await placeOrder(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ order: expect.any(Object), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});

test("Test placeOrder to Fail", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			user: { username: "Test" },
			body: {
				tconst: "",
				quantity: 3,
			},
		};
		await placeOrder(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(JSON) });
	}
});

test("Test getOrders to Pass", async () => {
	try {
		const mockRequest = {
			headers: { authorization: `Bearer ${token}` },
			user: { username: "Test" },
		};
		await getOrders(mockRequest as unknown as Request, mockResponse as Response, jest.fn());
		expect(mockResponse.json).toHaveBeenCalledWith({ orders: expect.any(Array), message: expect.any(String) });
	} catch (error) {
		fail(error);
	}
});
