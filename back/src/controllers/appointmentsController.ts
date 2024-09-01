import {Request, Response} from "express"; 
import IAppointment from "../interfaces/IAppointment";
import { cancelAppointmentByIdService, createAppointmentService, getAppointmentByIdService, getAppointmentsService } from "../services/appointmentService";
import IAppointmentDto from "../dtos/IAppointmentDto";
import { Appointment } from "../entities/Appointment";

export const getAppointments = async(req:Request, res:Response) => {
    try {
        const appointments:Appointment[] = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error:any) {
        res.status(404).json({error:error.message});
    }    
};

export const getAppointmentById = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const appointment:Appointment = await getAppointmentByIdService (Number(id));
        res.status(200).json(appointment);
    } catch (error:any) {
        res.status(404).json({error:error.message});
    }    
};

export const createAppointment = async(req:Request, res:Response) => {
    try {
        const newAppointment:Appointment = await createAppointmentService (req.body);
        res.status(201).json(newAppointment);
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }    
};

export const cancelAppointment = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const cancelledAppointment:Appointment = await cancelAppointmentByIdService (Number(id));
        res.status(200).json({message: "Appointment cancelled", cancelledAppointment});
    } catch (error:any) {
        res.status(404).json({error:error.message});
    }    
};