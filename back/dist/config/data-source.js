"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentModel = exports.credentialModel = exports.userModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Appointment_1 = require("../entities/Appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [User_1.User, Credential_1.Credential, Appointment_1.Appointment],
    subscribers: [],
    migrations: [],
});
exports.userModel = exports.AppDataSource.getRepository(User_1.User);
exports.credentialModel = exports.AppDataSource.getRepository(Credential_1.Credential);
exports.appointmentModel = exports.AppDataSource.getRepository(Appointment_1.Appointment);
