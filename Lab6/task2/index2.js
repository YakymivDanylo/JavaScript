const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const createTaskElement = (taskText, id) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', id);

    const text = document.createElement('span');
    text.textContent = taskText;
    li.appendChild(text);


    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTaskStatus(id, li.classList.contains('completed'));
    });


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(id);
    });

    li.appendChild(deleteButton);
    return li;
};


const addTask = (taskText) => {
    const taskId = Date.now();
    const taskElement = createTaskElement(taskText, taskId);
    taskList.appendChild(taskElement);
    saveTaskToLocalStorage(taskText, taskId);
    taskInput.value = '';
};


const saveTaskToLocalStorage = (taskText, taskId) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, id: taskId, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text, task.id);
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskList.appendChild(taskElement);
    });
};


const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    taskList.querySelector(`[data-id="${id}"]`).remove();
};


const updateTaskStatus = (id, completed) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};


addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
    }
});


document.addEventListener('DOMContentLoaded', loadTasks);
