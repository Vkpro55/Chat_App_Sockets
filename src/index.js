const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const { ServerConfig, DbConfig } = require('../config');


const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('msg_send', (data) => {
        console.log(data);

        io.emit('msg_rcvd', data);
    })
});


app.use('/', express.static(path.join(__dirname, "../public")));

server.listen(ServerConfig.PORT, async () => {
    console.log(`Socket Server started on PORT ${ServerConfig.PORT}...`);

    await DbConfig.connectDB();
});

