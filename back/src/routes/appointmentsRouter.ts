import { Router } from "express";

const appointmentsRouter: Router = Router ();

// GET /appointments => obtener todos los turnos de todos los usuarios
appointmentsRouter.get("/",)

// GET /appointments/:id => obtener un turno por id
appointmentsRouter.get("/:id",)

// POST /appointments/schedule => crear un nuevo turno
appointmentsRouter.post("/schedule",)

// PUT /appointments/cancel => cancelar un turno
appointmentsRouter.put("/cancel",)

export default appointmentsRouter;