"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/tasks`).then(res => {
      setTasks(res.data);
    });

    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "TASK_CREATED") {
        setTasks(prev => [data.task, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  const createTask = async () => {
    await axios.post(`${API_URL}/tasks`, { title });
    setTitle("");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Real-Time Task Board</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}
