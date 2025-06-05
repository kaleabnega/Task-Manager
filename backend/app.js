const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Study for an upcoming exam", completed: false },
  { id: 2, title: "Go to the gym", completed: true },
];

function getNextId() {
  if (tasks.length === 0) {
    return 1;
  }

  let maxId = tasks[0].id;
  for (let i = 1; i < tasks.length; i++) {
    if (tasks[i].id > maxId) {
      maxId = tasks[i].id;
    }
  }
  return maxId + 1;
}

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Task Manager API</title></head>
      <body>
        <h1>API is running!</h1>
        <p>Use /api/tasks to interact with the tasks list.</p>
      </body>
    </html>
  `);
});

app.get("/api/tasks", (req, res) => {
  const { completed } = req.query;

  if (completed === "true") {
    const onlyCompleted = tasks.filter((t) => t.completed === true);
    return res.json(onlyCompleted);
  }

  if (completed === "false") {
    const onlyPending = tasks.filter((t) => t.completed === false);
    return res.json(onlyPending);
  }

  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "Task title must be non-empty.",
    });
  }

  const newTask = {
    id: getNextId(),
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `No task found with id=${taskId}` });
  }

  task.completed = true;
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: `No task found with id=${taskId}` });
  }

  const [deletedTask] = tasks.splice(index, 1);
  res.json(deletedTask);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
