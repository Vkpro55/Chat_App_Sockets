const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const { ServerConfig, DbConfig } = require('../config');

const { ChatModel } = require('../models');


const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data.roomId);
        console.log(`Joined room: ${data.roomId}`);
    });

    socket.on('msg_send', async (data) => {

        const chat = await ChatModel.create({
            user: data.username,
            roomId: data.roomId,
            content: data.msg
        });

        io.to(data.roomId).emit('msg_rcvd', data);
    })

    socket.on('typing', (data) => {
        // io.to(data.roomId).emit('someone_typing');
        socket.broadcast.to(data.roomId).emit('someone_typing');
    })

});

app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, "../public")));

app.get('/chat/:roomId', async (req, res) => {

    const chats = await ChatModel.find({
        roomId: req.params.roomId
    });

    console.log(chats);

    res.render('chat-room', {
        name: 'Vinod Kumar',
        roomId: req.params.roomId,
        chats: chats
    });
})

server.listen(ServerConfig.PORT, async () => {
    console.log(`Socket Server started on PORT ${ServerConfig.PORT}...`);

    await DbConfig.connectDB();
});

