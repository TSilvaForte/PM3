import {Request, Response} from "express"; 
import IAppointment from "../interfaces/IAppointment";
import { cancelAppointmentByIdService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentService";
import IAppointmentDto from "../dtos/IAppointmentDto";

export const getAppointments = async(req:Request, res:Response) => {
    try {
        const appointments:IAppointment[] = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({message: "Error loading apppointments", error: errorMessage});
    }    
};

export const getAppointmentById = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const appointment:IAppointment = await getAppointmentByIdService (Number(id));
        res.status(200).json(appointment);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(404).json({message: "Appointment not found", error: errorMessage});
    }
};

export const createAppointment = async(req:Request, res:Response) => {
    try {
        const {date, time, userId, status, description}: IAppointmentDto = req.body;
        const newAppointment:IAppointment = await createAppointmentService ({date, time, userId, status, description});
        res.status(201).json(newAppointment);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({message: "Error creating appointment", error: errorMessage});
    }
};

export const cancelAppointment = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const cancelledAppointment:IAppointment = await cancelAppointmentByIdService (Number(id));
        res.status(200).json({message: "Appointment cancelled", cancelledAppointment});
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(404).json({ message: "Error cancelling appointment", error: errorMessage });
    }
};