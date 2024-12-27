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
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getAppointments = getAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appointmentService_1.createAppointmentService)(req.body);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cancelledAppointment = yield (0, appointmentService_1.cancelAppointmentByIdService)(Number(id));
        res.status(200).json({ message: "Appointment cancelled", cancelledAppointment });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.cancelAppointment = cancelAppointment;
