import express from "express";
import cors from "cors";
import { prisma } from "@repo/db";
import WebSocket from "ws";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

let ws: WebSocket | null = null;

const connectWS = () => {
  ws = new WebSocket("ws://localhost:3002");

  ws.on("open", () => {
    console.log("Connected to WS server");
  });

  ws.on("close", () => {
    ws = null;
    setTimeout(connectWS, 1000);
  });
};

connectWS();

app.get("/tasks", async (_, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = await prisma.task.create({
    data: { title: req.body.title }
  });

  ws?.send(JSON.stringify({ type: "TASK_CREATED", task }));
  res.json(task);
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
