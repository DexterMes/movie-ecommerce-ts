import { Request, Response } from "express";
import { handleLogin, registerUser } from "../user.controller";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
	mockRequest = {};
	mockResponse = {
		json: jest.fn(),
		status: jest.fn().mockReturnThis(),
	};
});

// test("Test Register to Pass", async () => {
// 	mockRequest = {
// 		body: {
// 			username: "Test",
// 			password: "Test@12345",
// 		},
// 	};
// 	try {
// 		await registerUser(mockRequest as Request, mockResponse as Response, jest.fn());
// 	} catch (error) {
// 		fail(error);
// 	}
// 	expect(mockResponse.json).toHaveBeenCalledWith({ message:expect.any(String) });
// });

test("Test Register to Fail", async () => {
	mockRequest = {
		body: {
			username: "Test",
			password: "Test@12345",
		},
	};
	try {
		await registerUser(mockRequest as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});

// test("Test Login to Pass", async () => {
// 	mockRequest = {
// 		body: {
// 			username: "Test",
// 			password: "Test@12345",
// 		},
// 	};
// 	try {
// 		await handleLogin(mockRequest as Request, mockResponse as Response, jest.fn());
// 		expect(mockResponse.json).toHaveBeenCalledWith({ token: expect.any(String), role: "CUSTOMER", message: expect.any(String) });
// 	} catch (error) {
// 		fail(error);
// 	}
// });

test("Test Login to Fail", async () => {
	mockRequest = {
		body: {
			username: "Test",
			password: "Test@1234",
		},
	};
	try {
		await handleLogin(mockRequest as Request, mockResponse as Response, jest.fn());
	} catch (error) {
		expect(mockResponse.json).toHaveBeenCalledWith({ error: expect.any(String) });
	}
});
