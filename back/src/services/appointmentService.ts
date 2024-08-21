import IAppointmentDto from "../dtos/IAppointmentDto";
import IAppointment from "../interfaces/IAppointment";

//Implementar una función que pueda retornar el arreglo completo de turnos.
let appointments:IAppointment[] = [];
let id: number = 1;

export const getAppointmentsService = async(): Promise<IAppointment[]> => {
    return appointments;
};

//Implementar una función que pueda obtener el detalle de un turno por ID.

export const getAppointmentByIdService = async (id:number): Promise<IAppointment> => {
    const foundAppointment: IAppointment | undefined = appointments.find((appointment) => appointment.id === id);
    if (!foundAppointment) throw new Error ("Appointment not found");
    return foundAppointment;
}

//Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO. 

export const createAppointmentService = async(appointmentData:IAppointmentDto): Promise<IAppointment> => {
    const newAppointment: IAppointment = {
        id: id++,
        date: appointmentData.date,
        time: appointmentData.time,
        userId: appointmentData.userId,
        description: appointmentData.description,
        status: appointmentData.status
        }

    appointments.push(newAppointment);
    return newAppointment;
};

//Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.

export const cancelAppointmentByIdService = async (id:number): Promise<IAppointment> => {
    const foundAppointment: IAppointment | undefined = appointments.find((appointment) => appointment.id === id);
    if (!foundAppointment) throw new Error ("Appointment not found");

    foundAppointment.status = "Cancelled";
    return foundAppointment;
};