const express = require('express'); /*== Funtion ==*/
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const { config } = require('dotenv');

const app = express(); /*== Function => Express function handling routes & middleware. ==*/
const server = http.createServer(app); /*== Object =>  HTTP server listening for connections, needed for WebSockets or advanced HTTP features. ==*/
const io = new Server(server); /*== Attaching WebSocket Server to HTTP Server to handle websockets connection alongside with http connection ==*/

config();

/*== Middlewares==*/
app.use('/', express.static(path.join(__dirname, "../public")));


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('msg_send', (data) => {
        console.log(data);

        /*== io.emit() is used to broadcast a message to all connected clients. It sends an event and its associated data to every client currently connected to the server ==*/

        // io.emit('msg_rcvd', data);
        // socket.emoty('msg_rcvd', data);
        socket.broadcast.emit('msg_rcvd', data);
    })
});

const PORT = process.env.PORT || 4000;
/*== 
     1. Express.js creates internally and listend on PORT => http.createServer(app)
     2. This server is not exposed for direct use

    app.listen(PORT, () => {
        console.log(`Socket Server started on PORT ${PORT}...`);
    });
==*/

/*== 
    The socket.io client library is served automatically when you initialize the Socket.IO server. 
    app.use('/socket.io', express.static('node_modules/ socket.io/client-dist'));
==*/
server.listen(PORT, () => {
    console.log(`Socket Server started on PORT ${PORT}...`);
});

