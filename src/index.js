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

    setInterval(() => {
        socket.emit("Hello_Event", "Hello from Socket.io server...");
    }, 3000);

    socket.on("Btn-Click", (args) => {
        console.log(args);
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

