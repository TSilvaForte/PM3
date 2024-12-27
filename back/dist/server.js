"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
//MIDDLEWARES
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use(indexRoutes_1.default);
//server.use(morgan(dev))?
exports.default = server;
