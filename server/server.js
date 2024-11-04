import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const port = 3000;

const app = express();
const server  = createServer(app);

const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        methods:["GET","POST"],
        credentials:true
    },
});


app.get('/',(req,res) => {
    res.send("Assalamualikum");
});

io.on('connection',(socket) => {
    console.log('user Connected');
    console.log('ID',socket.id);
    socket.on('disconnect',() => {
        console.log(`${socket.id} disconnected`);
    })
    socket.on('message',(data) => {
        console.log(data);
    })
})

server.listen(port,() => {
    console.log(`server listening on ${port}`);
})