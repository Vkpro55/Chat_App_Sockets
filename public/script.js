var socket = io();

socket.on("Hello_Event", (arg) => {
    const div = document.createElement('div');
    div.innerText = arg;

    const root = document.getElementById('root');
    root.appendChild(div);
});

const btn = document.getElementById('btn');
btn.onclick = function exec() {
    socket.emit("Btn-Click", { name: "Vinod Kumar" });
};