"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const isDev = app.settings.env === 'development';
const URL = isDev ? 'http://localhost:3000' : 'http://localhost:3000';
app.use((0, cors_1.default)({ origin: URL }));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: URL } });
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
    console.log(`Server is running on port ${PORT}`);
});
