"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const usersRouter = (0, express_1.Router)();
// GET /users => obtener todos los usuarios
usersRouter.get("/", usersController_1.getUsers);
// GET /users/:id => obtener un usuario por id
usersRouter.get("/:id", usersController_1.getUserById);
// POST /users/register => crear un nuvo usuario
usersRouter.post("/register", usersController_1.createUser);
// POST /users/login => loguear un usuario existente
usersRouter.post("/login", usersController_1.loginUser);
exports.default = usersRouter;
