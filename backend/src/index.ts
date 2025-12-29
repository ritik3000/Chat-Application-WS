import { WebSocket, WebSocketServer } from "ws";
const PORT = Number(process.env.PORT) || 8081;

const wss = new WebSocketServer({ port: PORT });


interface User {
  socket: WebSocket;
  room: string;
  username: string;
}


const allSocket: User[] = [];

function logRoomStatus() {
    const roomCounts: { [key: string]: number } = {};
    allSocket.forEach(user => {
    roomCounts[user.room] = (roomCounts[user.room] || 0) + 1;
  });
console.log("Room status:", roomCounts);
console.log("Total connected users:", allSocket.length);
}

function broadcastToRoom(room: string, message: any, excludeSocket?: WebSocket) {
    allSocket.forEach((u,i) => {
        if (u.room == room && u.socket != excludeSocket) {
            u.socket.send(JSON.stringify(message));
        }
    })
}
wss.on("connection", (socket)=> {
    socket.on("message", (e) => {
        const parsedMessage = JSON.parse(e.toString());
        if (parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId;
            const username = parsedMessage.payload.username;
            const existingUserIndex = allSocket.findIndex((u) => u.socket === socket);
                if (existingUserIndex !== -1) {
                    const user = allSocket[existingUserIndex]
                    if (user) {
                        user.room = roomId;
                        user.username = username;
                    }
                } else {
                    allSocket.push({ socket, room: roomId, username });
                }
                socket.send(
                    JSON.stringify({
                    type: "system",
                    payload: { message: `You joined room: ${roomId} as ${username}` },
                    })
                );
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
    })
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
    })
})
