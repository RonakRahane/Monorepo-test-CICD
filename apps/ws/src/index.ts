import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3002 });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

console.log("WebSocket server running on ws://localhost:3002");
