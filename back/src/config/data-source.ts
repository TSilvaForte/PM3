/* import { DataSource } from "typeorm";

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})

export const userModel = AppDataSource.getRepository(User)
export const credentialModel = AppDataSource.getRepository(Credential)
export const appointmentModel = AppDataSource.getRepository(Appointment) */

import { DataSource } from "typeorm";
import { DB_URL } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DB_URL, 
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
    extra: {
        ssl: {
            rejectUnauthorized: false, 
        },
    },
});

export const userModel = AppDataSource.getRepository(User);
export const credentialModel = AppDataSource.getRepository(Credential);
export const appointmentModel = AppDataSource.getRepository(Appointment);