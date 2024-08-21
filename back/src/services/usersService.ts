import IUserDto from "../dtos/IUserDto";
import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser"
import { createCredential } from "./credentialService";

//Implementar una función que pueda retornar el arreglo completo de usuarios.

let users:IUser[] = [];
let id: number = 1;

export const getUsersService = async(): Promise<IUser[]> => {
    return users;
};

//Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.

export const getUserByIdService = async (id:number): Promise<IUser> => {
    const foundUser: IUser | undefined = users.find((user) => user.id === id);
    if (!foundUser) throw new Error ("User not found");
    return foundUser;
}

//Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.

export const createUserService = async(userData:IUserDto): Promise<IUser> => {
    const credentialId: number = await createCredential ({
        username: userData.username,
        password: userData.password
    });

    const newUser: IUser = {
        id: id++,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialId: credentialId
        }

    users.push(newUser);
    return newUser;
};
