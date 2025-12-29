let socket: WebSocket | null = null;
let roomId: string | null = null;
let username: string | null = null;
let isConnecting = false;

export function setUsername(name: string) {
  username = name;
}

export function getUsername() {
  return username;
}

export function createSocket(joinedRoomId: string, user: string) {
  if (socket) {
    console.log("Closing existing socket for new connection");
    socket.close();
  }

  isConnecting = true;
  socket = new WebSocket('ws://localhost:8081');

  socket.onopen = () => {
    console.log("Socket connected");
    isConnecting = false;
    
    // Send join message immediately after connection
    socket?.send(
      JSON.stringify({
        type: "join",
        payload: { roomId: joinedRoomId, username: user },
      })
    );
    roomId = joinedRoomId;
    username = user;
  };

  socket.onclose = () => {
    console.warn("Socket closed");
    isConnecting = false;
  };

  socket.onerror = (error) => {
    console.error("Socket error:", error);
    isConnecting = false;
  };

  return socket;
}

export function getSocket() {
  return socket;
}

export function getRoomId() {
  return roomId;
}

export function disconnect() {
  if (socket) {
    console.log("Disconnecting socket");
    socket.close();
    socket = null;
    roomId = null;
    username = null;
    isConnecting = false;
  }
}