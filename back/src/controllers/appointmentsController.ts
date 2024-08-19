import {Request, Response} from "express"; 

export const getAppointments = async(req:Request, res:Response) => {
    res.send("Esta función obtiene el listado de todos los turnos de todos los usuarios.");
};

export const getAppointmentById = async(req:Request, res:Response) => {
    res.send("Esta función obtiene el detalle de un turno específico.");
};

export const createAppointment = async(req:Request, res:Response) => {
    res.send("Esta función agenda un nuevo turno.");
};

export const cancelAppointment = async(req:Request, res:Response) => {
    res.send("Esta función cambia el estatus de un turno a “cancelled”.");
};