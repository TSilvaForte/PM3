import { Router } from "express";
import { cancelAppointment, createAppointment, getAppointmentById, getAppointments } from "../controllers/appointmentsController";

const appointmentsRouter: Router = Router ();

// GET /appointments => obtener todos los turnos de todos los usuarios
appointmentsRouter.get("/", getAppointments)

// GET /appointments/:id => obtener un turno por id
appointmentsRouter.get("/:id", getAppointmentById)

// POST /appointments/schedule => crear un nuevo turno
appointmentsRouter.post("/schedule", createAppointment)

// PUT /appointments/cancel => cancelar un turno
appointmentsRouter.put("/cancel/:id", cancelAppointment)

export default appointmentsRouter;