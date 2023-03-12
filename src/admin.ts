import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSPrisma from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import { DMMFClass } from "@prisma/client/runtime";

const prisma = new PrismaClient();

AdminJS.registerAdapter({
	Resource: AdminJSPrisma.Resource,
	Database: AdminJSPrisma.Database,
});

const dmmf = (prisma as any)._baseDmmf as DMMFClass;
const admin = new AdminJS({
	resources: [
		// {resource: { model: dmmf.modelMap.TitalAkas, client: prisma }},
		// {resource: { model: dmmf.modelMap.Crew, client: prisma }},
		// {resource: { model: dmmf.modelMap.Episode, client: prisma }},
		// {resource: { model: dmmf.modelMap.Principal, client: prisma }},
		{ resource: { model: dmmf.modelMap.Name, client: prisma } },
		// {resource: { model: dmmf.modelMap.Rating, client: prisma }},
		{ resource: { model: dmmf.modelMap.Movie, client: prisma } },
		{
			resource: { model: dmmf.modelMap.User, client: prisma },
			options: {
				properties: {
					username: { label: "Username" },
					password: { label: "Password" },
					role: { label: "Role" },
					cart: { label: "Cart" },
					order: { label: "Orders" },
				},
			},
		},
		{ resource: { model: dmmf.modelMap.Order, client: prisma } },
	],
});

const adminJsRouter = AdminJSExpress.buildRouter(admin);

export default adminJsRouter;
