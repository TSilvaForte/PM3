import IUserDto from "../dtos/IUserDto";
import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser"
import { User } from "../entities/User";
import { userModel } from "../config/data-source";
import { createCredential } from "./credentialService";
import { Credential } from "../entities/Credential";

//Implementar una función que pueda retornar el arreglo completo de usuarios.

export const getUsersService = async(): Promise<User[]> => {
    const users:User[] = await userModel.find();
    return users;
};

//Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.

export const getUserByIdService = async (id:number): Promise<User | null> => {
    const foundUser: User | null = await userModel.findOne ({where: {id}, relations: ["appointments"]});
    if (!foundUser) throw new Error ("User not found");
    return foundUser;
}

//Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.

export const createUserService = async(userData:IUserDto): Promise<User> => {
    /* const credentialId: number = await createCredential ({
        username: userData.username,
        password: userData.password
    });

    const newUser: User = {
        id: id++,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialId: credentialId
        }
        users.push(newUser);
 */

    const newUser: User = await userModel.create(userData)
    await userModel.save(newUser)
    const newCredential: Credential = await createCredential ({
        username: userData.username,
        password: userData.password
    })
    newUser.credential = newCredential
    userModel.save(newUser)
    return newUser;
};

export const findUserByCredentialId = async (credentialId:number) => {
    const userFound = await userModel.findOneBy({credential: {id: credentialId}});
    return userFound;
}