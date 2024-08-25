import { appointmentModel, userModel } from "../config/data-source";
import IAppointmentDto from "../dtos/IAppointmentDto";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";

//Implementar una función que pueda retornar el arreglo completo de turnos.
export const getAppointmentsService = async(): Promise<Appointment[]> => {
    const appointments:Appointment[] = await appointmentModel.find();
    return appointments;
};

//Implementar una función que pueda obtener el detalle de un turno por ID.
export const getAppointmentByIdService = async (id:number): Promise<Appointment> => {
    const foundAppointment: Appointment | null = await appointmentModel.findOneBy ({id});
    if (!foundAppointment) throw new Error ("Appointment not found");
    return foundAppointment;
}

//Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO. 
export const createAppointmentService = async(appointmentData:IAppointmentDto): Promise<Appointment> => {
    const newAppointment: Appointment = await appointmentModel.create(appointmentData);
    await appointmentModel.save(newAppointment);
    const user: User|null = await userModel.findOneBy({id: appointmentData.userId})
    if (!user) {
        throw new Error("User not found");
    }
    newAppointment.user = user;
    await appointmentModel.save(newAppointment);
    return newAppointment;
};

//Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.

export const cancelAppointmentByIdService = async (id:number): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentModel.findOneBy({id});
    if (!appointment) throw new Error ("Appointment not found");
    appointment.status = "Cancelled";
    await appointmentModel.save(appointment)
    return appointment;
};