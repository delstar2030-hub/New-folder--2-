const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = path.join(__dirname, "data", "tasks.json");


// Function to read tasks safely
function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}


// Function to save tasks
function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}


// GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


// POST new task
app.post("/tasks", (req, res) => {

  const { title, description, time } = req.body;

  if (!title || !description || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title,
    description,
    time
  };

  tasks.push(newTask);

  saveTasks(tasks);

  res.json(newTask);
});


// DELETE / COMPLETE task
app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  let tasks = readTasks();

  tasks = tasks.filter(task => task.id !== id);

  saveTasks(tasks);

  res.json({ message: "Task completed!" });

});


app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});