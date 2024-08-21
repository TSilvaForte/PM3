import ICredentialDto from "../dtos/ICredentialDto";
import ICredential from "../interfaces/ICredential";

const credentials:ICredential[] = [];
let credentialId:number = 1;

export const createCredential = async(credentialDTO:ICredentialDto):Promise<number> => {
    const newCredential: ICredential = {
        id: credentialId++,
        username: credentialDTO.username,
        password: credentialDTO.password
    }

    credentials.push(newCredential);
    return newCredential.id;
};

export const validateCredential = async (credentialDTO: ICredentialDto):Promise<number> => {
    const { username, password } = credentialDTO;
    const foundCredential: ICredential | undefined = credentials.find(
        (credential) => credential.username === username
    );

    if (!foundCredential) {
        throw new Error("User not registered");
    }

    if (foundCredential.password !== password) {
        throw new Error("Login failed. Wrong credentials");
    }

    return foundCredential.id;
};