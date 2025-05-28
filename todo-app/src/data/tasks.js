const tasks = [];

function createTask(title, description, dueDate) {
    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    return task;
}

function getTasks() {
    return tasks;
}

function updateTask(id, updatedTask) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        saveTasks();
        return tasks[index];
    }
    return null;
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks();
        return true;
    }
    return false;
}

function markTaskAsCompleted(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = true;
        saveTasks();
        return task;
    }
    return null;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks.push(...JSON.parse(storedTasks));
    }
}

loadTasks();

export { createTask, getTasks, updateTask, deleteTask, markTaskAsCompleted };

