import {Request, Response} from "express"; 

export const getUsers = async(req:Request, res:Response) => {
    res.send("Esta función obtiene el listado de todos los usuarios.");
};

export const getUserById = async(req:Request, res:Response) => {
    res.send("Esta función obtiene el detalle de un usuario específico.");
};

export const createUser = async(req:Request, res:Response) => {
    res.send("Esta función registra de un nuevo usuario.");
};

export const loginUser = async(req:Request, res:Response) => {
    res.send("Esta función loguea al usuario a la aplicación.");
};
