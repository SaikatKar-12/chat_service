const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require("cors");
var id;

const connect = require('./config/database-config');

const Chat = require('./models/chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid)
        socket.join(data.roomid);
    });

    socket.on('msg_send', async (data) => {
        console.log(data);
        data.username=id;
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        });
        io.to(data.roomid).emit('msg_rcvd', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.to(data.roomid).emit('someone_typing');
    })
});
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));
app.use(cors());
app.get('/chat/:roomid/:userid', async (req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomid,
        //username:req.params.userid
    }).select('content user');
    id=req.params.userid;
    console.log(chats);
    //chats.username=userid;
    res.render('index', {
        name: 'Sanket',
        id: req.params.roomid,
        chats: chats
    });
});

server.listen(5000, async () => {
    console.log('Server started');
    await connect();
    console.log("mongo db connected")
});