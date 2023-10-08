"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
require('dotenv').config(); // Load environment variables from .env file
const app = (0, express_1.default)();
// const isDev = app.settings.env === 'development';
const isDev = process.env.NODE_ENV === 'development';
const frontendURL = isDev ? 'http://localhost:3000' : 'https://scatch-book.vercel.app';
// const URL = isDev ?  'https://scatch-book.vercel.app':'http://localhost:3000' 
// const URL = isDev ? 'http://localhost:3000' : 'https://scatch-book.vercel.app';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
io.on('connection', (socket) => {
    console.log('server connected');
    socket.on('beginPath', (arg) => {
        socket.broadcast.emit('beginPath', arg);
    });
    socket.on('drawLine', (arg) => {
        socket.broadcast.emit('drawLine', arg);
    });
    socket.on('changeConfig', (arg) => {
        socket.broadcast.emit('changeConfig', arg);
    });
});
const PORT = 5000;
httpServer.listen(PORT, () => {
    console.log(app.settings.env);
    console.log(`Server is running on port ${PORT}`);
});
