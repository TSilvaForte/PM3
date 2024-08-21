import {Request, Response} from "express"; 
import IUser from "../interfaces/IUser";
import { createUserService, getUserByIdService, getUsersService } from "../services/usersService";
import ICredential from "../interfaces/ICredential";
import { validateCredential } from "../services/credentialService";
import ICredentialDto from "../dtos/ICredentialDto";
import IUserDto from "../dtos/IUserDto";

export const getUsers = async(req:Request, res:Response) => {
    try {
        const users:IUser[] = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({message: "Error loading users", error: errorMessage});
    }    
};

export const getUserById = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const user:IUser = await getUserByIdService (Number(id));
        res.status(200).json(user);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(404).json({ message: "User not found", error: errorMessage });
    }
};

export const createUser = async(req:Request, res:Response) => {
    try {
        const { name, email, birthdate, nDni, username, password }: IUserDto = req.body;
        const newUser:IUser = await createUserService ({name, email, birthdate, nDni, username, password});
        res.status(201).json(newUser);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: "Error creating user", error: errorMessage });
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
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage === "Login failed. Wrong credentials" || errorMessage === "User not registered") {
            return res.status(401).json({ message: errorMessage });
        }
        res.status(500).json({ message: "Error validating credentials", error: errorMessage });
    }
};
