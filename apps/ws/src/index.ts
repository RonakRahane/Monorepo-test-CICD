import "./config";
import WebSocket, { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT || process.env.WS_PORT);
if (!PORT) throw new Error("PORT is not defined");

const wss = new WebSocketServer({
  port: PORT,
  host: "0.0.0.0"
});


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

console.log(`WS running on port ${PORT}`);
