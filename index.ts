import express, { Application, Router } from "express";
import dotenv from "dotenv";
import * as http from "http";
import AdminJS from "adminjs";

import { handleLogin, registerUser } from "./src/user.controller";
// import { getAllMovies, getFilteredMovies, getMoviesByGenre, getMoviesByName, getMoviesByPeople, getMoviesByYear } from "./src/movie.controller";
import { getAllMovies, getFilteredMovies } from "./src/movie.controller";
import { isAuthenticated } from "./src/middleware/auth.middleware";
import { addToCart, getOrders, placeOrder, removeFromCart } from "./src/order.controller";
import adminJsRouter from "./src/admin";

dotenv.config();
// Init Express Application
const app: Application = express();

// Init Http Server
const httpServer: http.Server = http.createServer(app);

app.use(express.json());

// Init a AdminJS Port and AdminJS
const CLIENT_PORT: number = parseInt(<string>process.env.CLIENT_PORT) || 5000;
const admin = new AdminJS({});

// Route for AdminJS, Function is imported from admin.ts
app.use(admin.options.rootPath, adminJsRouter);

app.listen(CLIENT_PORT, () => {
	console.log(`AdminJS RUNNING ON PORT ${CLIENT_PORT}`);
});

// Unprotected routes
app.post("/user/register", registerUser);
app.get("/user/login", handleLogin);

// Using middleware to protect the routes, all routes below this will need authorization
app.use(isAuthenticated);

app.get("/movie", getAllMovies);
// app.get("/movie/year/:year", getMoviesByYear);
// app.get("/movie/name/:name", getMoviesByName);
// app.get("/movie/actors/:name", getMoviesByPeople);
// app.get("/movie/genre/:genre", getMoviesByGenre);
app.get("/movie/filter", getFilteredMovies);

app.post("/movie/order", placeOrder);
app.get("/movie/order", getOrders);
app.post("/movie/:tconst", addToCart);
app.delete("/movie/:tconst", removeFromCart);

// Init Server Port
const SERVER_PORT: number = parseInt(<string>process.env.SERVER_PORT) || 7000;

httpServer.listen(SERVER_PORT, () => console.log(`SERVER RUNNING ON PORT ${SERVER_PORT}`));

export default app;
