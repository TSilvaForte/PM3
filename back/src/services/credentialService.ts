import ICredentialDto from "../dtos/ICredentialDto";
import ICredential from "../interfaces/ICredential";
import { Credential } from "../entities/Credential";
import { credentialModel } from "../config/data-source";

const credentials:Credential[] = [];

export const createCredential = async(credentialData:ICredentialDto):Promise<Credential> => {
    const newCredential: Credential = await credentialModel.create(credentialData);
    await credentialModel.save(newCredential);
    return newCredential;
};

export const validateCredential = async (credentialDTO: ICredentialDto):Promise<number> => {
    const { username, password } = credentialDTO;
    const foundCredential: Credential | null = await credentialModel.findOneBy({username});
    if (!foundCredential) {
        throw new Error("User not registered");
    }

    if (foundCredential.password !== password) {
        throw new Error("Login failed. Wrong credentials");
    }

    return foundCredential.id;
};