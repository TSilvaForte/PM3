import express from "express";
import router from "./routes/indexRoutes";
import cors from "cors";
const server = express();

//MIDDLEWARES
server.use(express.json());
server.use(cors());
server.use(router);
//server.use(morgan(dev))?

export default server;
