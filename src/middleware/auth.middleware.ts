import { Request, Response, NextFunction, RequestHandler } from "express";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "") as string;
		const data: any = jwt.verify(token, process.env.JWT_SECRET as string);
		const user = await prisma.user.findUnique({
			where: {
				username: data.username,
			},
		});

		if (!user) throw new Error();

		req.user = user as User;

		next();
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized!" });
	}
};
