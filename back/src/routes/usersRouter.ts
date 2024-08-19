import { Router } from "express";

const usersRouter: Router = Router ();

// GET /users => obtener todos los usuarios
usersRouter.get("/",)

// GET /users/:id => obtener un usuario por id
usersRouter.get("/:id",)

// POST /users/register => crear un nuvo usuario
usersRouter.post("/register",)

// POST /users/login => loguear un usuario existente
usersRouter.post("/login",)

export default usersRouter;