import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import cors from 'cors';
require('dotenv').config(); // Load environment variables from .env file

const app = express();
// const isDev = app.settings.env === 'development';
 const isDev = process.env.NODE_ENV === 'development';
const frontendURL = isDev ? 'http://localhost:3000' : 'https://scatch-book.vercel.app/';

// const URL = isDev ?  'https://scatch-book.vercel.app':'http://localhost:3000' 
// const URL = isDev ? 'http://localhost:3000' : 'https://scatch-book.vercel.app';
 const corsOptions = {
  origin: frontendURL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
// app.use(cors({origin: URL}));
app.use(cors(corsOptions));
interface chageConfigs  {
    color?: string;
    size?:number
}
 
const httpServer = createServer(app);
// const io = new SocketServer(httpServer, { cors: {corsOptions} });
const io = new SocketServer(httpServer, {
  cors: {
    origin: frontendURL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket: Socket) => {
  console.log('server connected');

  socket.on('beginPath', (arg: MouseEvent) => {
    socket.broadcast.emit('beginPath', arg);
  });
 

  socket.on('drawLine', (arg: MouseEvent) => {
    socket.broadcast.emit('drawLine', arg);
  });

    socket.on('changeConfig', (arg: chageConfigs) => {
      
    socket.broadcast.emit('changeConfig', arg);
  });
});

const PORT: number = 5000;

httpServer.listen(PORT, () => {
  console.log(app.settings.env)
  console.log(`Server is running on port ${PORT}`);
});
