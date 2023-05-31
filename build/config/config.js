"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGOBD_USERNAME = process.env.MONGOBD_USERNAME || '';
const MONGOBD_PASSWORD = process.env.MONGOBD_PASSWORD || '';
const MONGOBD_URL = `mongodb+srv://${MONGOBD_USERNAME}:${MONGOBD_PASSWORD}@cluster0.lduq839.mongodb.net/database-mxh`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
exports.config = {
    mongo: { url: MONGOBD_URL },
    server: { port: SERVER_PORT }
};
