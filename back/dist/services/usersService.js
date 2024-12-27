"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByCredentialId = exports.createUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const credentialService_1 = require("./credentialService");
//Implementar una función que pueda retornar el arreglo completo de usuarios.
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.userModel.find();
    return users;
});
exports.getUsersService = getUsersService;
//Implementar una función que pueda retornar un elemento del arreglo que haya sido identificado por id.
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield data_source_1.userModel.findOne({ where: { id }, relations: ["appointments"] });
    if (!foundUser)
        throw new Error("User not found");
    return foundUser;
});
exports.getUserByIdService = getUserByIdService;
//Implementar una función que pueda crear un nuevo usuario dentro del arreglo PERO ten en cuenta que al momento de crear el usuario, debe crear su correspondiente par de credenciales llamando a la función correspondiente del servicio de credenciales. Al recibir de esta función el id de las credenciales, debe guardar el dato en la propiedad credentialsId.
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newUser = yield data_source_1.userModel.create(userData);
    yield data_source_1.userModel.save(newUser);
    const newCredential = yield (0, credentialService_1.createCredential)({
        username: userData.username,
        password: userData.password
    });
    newUser.credential = newCredential;
    data_source_1.userModel.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
const findUserByCredentialId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.userModel.findOneBy({ credential: { id: credentialId } });
    return userFound;
});
exports.findUserByCredentialId = findUserByCredentialId;
