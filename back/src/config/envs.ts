/* import "dotenv/config";

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME; */

import "dotenv/config";

const requiredEnvs = ["PORT", "DB_URL"];

requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

export const PORT = process.env.PORT!;
export const DB_URL = process.env.DB_URL!;