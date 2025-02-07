var socket = io();

let btn = document.getElementById('send-btn');
let inputMsg = document.getElementById('newMsg');
let msgList = document.getElementById('msglist');

btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg: inputMsg.value
    });
};


socket.on('msg_rcvd', (data) => {
    let li = document.createElement('li');
    li.innerText = data.msg;

    msgList.appendChild(li);
})