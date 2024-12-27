"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const appointmentsRouter = (0, express_1.Router)();
// GET /appointments => obtener todos los turnos de todos los usuarios
appointmentsRouter.get("/", appointmentsController_1.getAppointments);
// GET /appointments/:id => obtener un turno por id
appointmentsRouter.get("/:id", appointmentsController_1.getAppointmentById);
// POST /appointments/schedule => crear un nuevo turno
appointmentsRouter.post("/schedule", appointmentsController_1.createAppointment);
// PUT /appointments/cancel => cancelar un turno
appointmentsRouter.put("/cancel/:id", appointmentsController_1.cancelAppointment);
exports.default = appointmentsRouter;
