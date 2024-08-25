import {Request, Response} from "express"; 
import IUser from "../interfaces/IUser";
import { createUserService, getUserByIdService, getUsersService } from "../services/usersService";
import ICredential from "../interfaces/ICredential";
import { validateCredential } from "../services/credentialService";
import ICredentialDto from "../dtos/ICredentialDto";
import IUserDto from "../dtos/IUserDto";
import { User } from "../entities/User";

export const getUsers = async(req:Request, res:Response) => {
    try {
        const users:User[] = await getUsersService();
        res.status(200).json(users);
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }    
};

export const getUserById = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const user:User | null = await getUserByIdService (Number(id));
        res.status(200).json(user);
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
};

export const createUser = async(req:Request, res:Response) => {
    try {
        const { name, email, birthdate, nDni, username, password }: IUserDto = req.body;
        const newUser:User = await createUserService ({name, email, birthdate, nDni, username, password});
        res.status(201).json(newUser);
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
};

export const loginUser = async(req:Request, res:Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Missing username or password" });
        }
        const user = await validateCredential ({username, password});
        res.status(200).json({ message: "Login successful", user });
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
};
