import { Router } from "express";
import { createUser, getUserById, getUsers, loginUser } from "../controllers/usersController";

const usersRouter: Router = Router ();

// GET /users => obtener todos los usuarios
usersRouter.get("/", getUsers)

// GET /users/:id => obtener un usuario por id
usersRouter.get("/:id", getUserById)

// POST /users/register => crear un nuvo usuario
usersRouter.post("/register", createUser)

// POST /users/login => loguear un usuario existente
usersRouter.post("/login", loginUser)

export default usersRouter;