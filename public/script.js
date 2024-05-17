var socket = io();

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');
// var userId = localStorage.getItem('userId');
        
//         // Check if userId is not null or undefined before setting the input value
//         if (userId !== null && userId !== undefined) {
//             // Set the value of the input field with id "username"
//             document.getElementById('username').value = userId;
// }
btn.onclick = function exec() {
    socket.emit('msg_send', {
        msg: inputMsg.value
    });
}

socket.on('msg_rcvd', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msgList.appendChild(limsg);
})