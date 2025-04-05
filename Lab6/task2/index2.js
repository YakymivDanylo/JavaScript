const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = [];

const createTask = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
});

const renderTasks = (list) => {
    taskList.innerHTML = "";
    list.forEach((task) => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        textSpan.className = task.completed ? "completed" : "";
        textSpan.contentEditable = true;
        textSpan.addEventListener("blur", () => editTask(task.id, textSpan.textContent));

        textSpan.onclick = () => toggleComplete(task.id);

        const controls = document.createElement("div");
        controls.className = "controls";

        const delBtn = document.createElement("button");
        delBtn.textContent = "Видалити";
        delBtn.onclick = () => deleteTask(task.id);

        controls.appendChild(delBtn);

        li.appendChild(textSpan);
        li.appendChild(controls);
        taskList.appendChild(li);
    });
};

const addTask = (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks = [...tasks, createTask(text)];
    taskInput.value = "";
    renderTasks(tasks);
};

const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks(tasks);
};

const editTask = (id, newText) => {
    tasks = tasks.map((task) =>
        task.id === id
            ? { ...task, text: newText.trim(), updatedAt: Date.now() }
            : task
    );
    renderTasks(tasks);
};

const toggleComplete = (id) => {
    tasks = tasks.map((task) =>
        task.id === id
            ? { ...task, completed: !task.completed, updatedAt: Date.now() }
            : task
    );
    renderTasks(tasks);
};

const sortTasks = (criteria) => {
    const sorted = [...tasks];
    switch (criteria) {
        case "created":
            sorted.sort((a, b) => a.createdAt - b.createdAt);
            break;
        case "completed":
            sorted.sort((a, b) => a.completed - b.completed);
            break;
        case "updated":
            sorted.sort((a, b) => b.updatedAt - a.updatedAt);
            break;
    }
    renderTasks(sorted);
};

taskForm.addEventListener("submit", addTask);