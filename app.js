const API_URL = "https://todo-back-dsfv.onrender.com/tasks";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

document.addEventListener("DOMContentLoaded", fetchTasks);
addBtn.addEventListener("click", addTask);

async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error("Error al cargar las tareas:", error);
  }
}

async function addTask() {
  const title = taskInput.value.trim();
  if (!title) return;

  const newTask = {
    title: title,
    completed: false,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      taskInput.value = "";
      fetchTasks();
    }
  } catch (error) {
    console.error("Error al agregar la tarea:", error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTasks();
    }
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");

    tasks.forEach((task) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = task.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteTask(task.id);

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
}
