# Simple Task Manager API

A lightweight Express-based REST API to manage tasks in memory. Tasks reset on each server restart.

---

## Features

- **List tasks**
- **Create a new task**
- **Mark a task as completed**
- **Delete a task**

---

## Setup

1. Clone or download into a folder (e.g., `backend/`), then:

   ```bash
   cd backend
   npm install express
   ```

2. Start the server:

```bash
node index.js
Listening on port 3000.
```

## Endpoints

1. GET /api/tasks
   Returns all tasks unless you add:

-> ?completed=true → only completed

-> ?completed=false → only pending

2. POST /api/tasks
   Body: { "title": "Task description" }

Creates a new task (completed: false).

Returns 400 if title is empty.

3. PUT /api/tasks/:id
   Marks the task with id as completed (completed = true).

Returns 404 if the ID doesn’t exist.

4. DELETE /api/tasks/:id
   Deletes the task with id.

Returns 404 if the ID doesn’t exist.
