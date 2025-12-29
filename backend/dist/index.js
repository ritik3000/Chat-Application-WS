"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const PORT = Number(process.env.PORT) || 8081;
const wss = new ws_1.WebSocketServer({ port: PORT });
const allSocket = [];
function logRoomStatus() {
    const roomCounts = {};
    allSocket.forEach(user => {
        roomCounts[user.room] = (roomCounts[user.room] || 0) + 1;
    });
    console.log("Room status:", roomCounts);
    console.log("Total connected users:", allSocket.length);
}
function broadcastToRoom(room, message, excludeSocket) {
    allSocket.forEach((u, i) => {
        if (u.room == room && u.socket != excludeSocket) {
            u.socket.send(JSON.stringify(message));
        }
    });
}
wss.on("connection", (socket) => {
    socket.on("message", (e) => {
        const parsedMessage = JSON.parse(e.toString());
        if (parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId;
            const username = parsedMessage.payload.username;
            const existingUserIndex = allSocket.findIndex((u) => u.socket === socket);
            if (existingUserIndex !== -1) {
                const user = allSocket[existingUserIndex];
                if (user) {
                    user.room = roomId;
                    user.username = username;
                }
            }
            else {
                allSocket.push({ socket, room: roomId, username });
            }
            socket.send(JSON.stringify({
                type: "system",
                payload: { message: `You joined room: ${roomId} as ${username}` },
            }));
        }
        if (parsedMessage.type === "chat") {
            const currentUser = allSocket.find((u) => u.socket === socket);
            if (!currentUser) {
                console.warn("User not found in socket list");
                logRoomStatus();
                return;
            }
            const room = currentUser.room;
            const author = currentUser.username;
            broadcastToRoom(room, {
                type: "chat",
                payload: {
                    message: parsedMessage.payload.message,
                    author,
                },
            });
        }
    });
    socket.on("close", () => {
        const index = allSocket.findIndex((u) => u.socket === socket);
        if (index !== -1) {
            const user = allSocket[index];
            if (user) {
                broadcastToRoom(user.room, {
                    type: "system",
                    payload: { message: `${user.username} left the room` },
                });
                allSocket.splice(index, 1);
                logRoomStatus();
            }
        }
    });
});
//# sourceMappingURL=index.js.map