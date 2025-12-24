"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/tasks").then(res => {
      setTasks(res.data);
    });

    const ws = new WebSocket("ws://localhost:3002");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "TASK_CREATED") {
        setTasks(prev => [data.task, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  const createTask = async () => {
    await axios.post("http://localhost:3001/tasks", { title });
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
