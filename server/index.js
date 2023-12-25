const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const PORT = 8000;
const users = [];

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}));

// Event For Socket Connection
io.on("connection", (socket) => {
    console.log(`user connected with socketId: ${socket.id}`);

    // Event For Create Room
    socket.on("create-room", ({ name, room }) => {
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        const roomExists = users.find((user) => user.room === room);
        if (roomExists) {
            // Emit Event For Create Room Response
            socket.emit("create-room-response", {
                name: name,
                room: room,
                message: "room is already exists",
                status: "FAILURE"
            });
        } else {
            users.push({ name: name, room: room });
            // Emit Event For Join Room Response
            socket.emit("create-room-response", {
                name: name,
                room: room,
                message: "room is created",
                status: "SUCCESS"
            });
        }
    });

    // Event For Join Room
    socket.on("join-room", ({ name, room }) => {
        const roomExists = users.find((user) => user.room === room);
        if (roomExists) {
            // Emit Event For Join Room Response
            socket.emit("join-room-response", {
                name: name,
                room: room,
                message: "room joined successfully",
                status: "SUCCESS"
            });
            socket.join(room);
        } else {
            // Emit Event For Join Room Response
            socket.emit("join-room-response", {
                name: name,
                room: room,
                message: "room not found",
                status: "FAILURE"
            });
        }
    });

    // Event For Send Message
    socket.on("send-message", ({ name, room, message, createdAt }) => {
        // Emit Event For Receive Message
        io.to(room).emit("receive-message", { name, room, message, createdAt });
    });

    // Event For Socket Disconnection
    socket.on("disconnect", () => {
        console.log(`user disconnected with socketId: ${socket.id}`);
    });

});

// Create Server On Localhost:8000
(async () => {
    try {
        server.listen(PORT);
        console.log(`Server Started On Localhost:${PORT}`);
    } catch (error) {
        console.log(`Unable To Create Server On Localhost:${PORT}`);
        console.log(error);
    }
})();
