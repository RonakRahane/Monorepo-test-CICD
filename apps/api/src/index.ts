import "./config";
import express from "express";
import cors from "cors";
import WebSocket from "ws";
import { prisma } from "@repo/db";

const app = express();

/* ========= ENV ========= */
const PORT = Number(process.env.PORT || process.env.API_PORT);
const WS_URL = process.env.WS_URL;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

if (!PORT) throw new Error("PORT is not defined");
if (!WS_URL) throw new Error("WS_URL is not defined");
if (!CORS_ORIGIN) throw new Error("CORS_ORIGIN is not defined");

/* ========= MIDDLEWARE ========= */
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

/* ========= WS CLIENT ========= */
let ws: WebSocket | null = null;

const connectWS = () => {
  ws = new WebSocket(WS_URL);

  ws.on("open", () => {
    console.log("API connected to WS");
  });

  ws.on("close", () => {
    ws = null;
    setTimeout(connectWS, 1000);
  });

  ws.on("error", () => {
    ws?.close();
  });
};

connectWS();

/* ========= ROUTES ========= */
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

  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "TASK_CREATED", task }));
  }

  res.json(task);
});

/* ========= START ========= */
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
