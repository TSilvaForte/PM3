"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentByIdService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
//Implementar una función que pueda retornar el arreglo completo de turnos.
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield data_source_1.appointmentModel.find();
    return appointments;
});
exports.getAppointmentsService = getAppointmentsService;
//Implementar una función que pueda obtener el detalle de un turno por ID.
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield data_source_1.appointmentModel.findOneBy({ id });
    if (!foundAppointment)
        throw new Error("Appointment not found");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
//Implementar una función que pueda crear un nuevo turno, siempre guardando, además, el ID del usuario que ha creado dicho turno. NO PUEDE HABER UN TURNO SIN ID DE USUARIO. 
const createAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield data_source_1.appointmentModel.create(appointmentData);
    yield data_source_1.appointmentModel.save(newAppointment);
    const user = yield data_source_1.userModel.findOneBy({ id: appointmentData.userId });
    if (!user) {
        throw new Error("User not found");
    }
    newAppointment.user = user;
    yield data_source_1.appointmentModel.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
//Implementar una función que reciba el id de un turno específico y una vez identificado el turno correspondiente, cambiar su estado a “cancelled”.
const cancelAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.appointmentModel.findOneBy({ id });
    if (!appointment)
        throw new Error("Appointment not found");
    appointment.status = "cancelled";
    yield data_source_1.appointmentModel.save(appointment);
    return appointment;
});
exports.cancelAppointmentByIdService = cancelAppointmentByIdService;
