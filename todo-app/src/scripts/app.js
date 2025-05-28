const listsEl = document.getElementById('lists');
const tasksSection = document.getElementById('tasks-section');
const tasksEl = document.getElementById('tasks');
const addListBtn = document.getElementById('add-list-btn');
const newListInput = document.getElementById('new-list-input');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskTime = document.getElementById('task-time');
const currentListTitle = document.getElementById('current-list-title');
const backToListsBtn = document.getElementById('back-to-lists');

let lists = JSON.parse(localStorage.getItem('todoLists')) || [];
let currentListIndex = null;

function save() {
  localStorage.setItem('todoLists', JSON.stringify(lists));
}

function renderLists() {
  listsEl.innerHTML = '';
  lists.forEach((list, idx) => {
    const li = document.createElement('li');
    li.textContent = list.name;
    li.className = idx === currentListIndex ? 'selected' : '';
    li.onclick = () => {
      currentListIndex = idx;
      showTasksSection();
    };
    listsEl.appendChild(li);
  });
}

function renderTasks() {
  if (currentListIndex === null) return;
  const list = lists[currentListIndex];
  currentListTitle.textContent = list.name;
  tasksEl.innerHTML = '';
  list.tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    // Task details
    const details = document.createElement('div');
    details.className = 'task-details';
    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;
    details.appendChild(title);
    const meta = document.createElement('span');
    meta.className = 'task-meta';
    meta.textContent = `${task.date} ${task.time}`;
    details.appendChild(meta);
    li.appendChild(details);
    // Actions
    const actions = document.createElement('div');
    actions.className = 'task-actions';
    // Complete
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Done';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      save();
      renderTasks();
    };
    actions.appendChild(completeBtn);
    // Edit
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(idx);
    actions.appendChild(editBtn);
    // Delete
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      list.tasks.splice(idx, 1);
      save();
      renderTasks();
    };
    actions.appendChild(delBtn);
    li.appendChild(actions);
    tasksEl.appendChild(li);
  });
}

function showTasksSection() {
  tasksSection.style.display = '';
  listsEl.parentElement.style.display = 'none';
  renderTasks();
}

function showListsSection() {
  tasksSection.style.display = 'none';
  listsEl.parentElement.style.display = '';
  renderLists();
}

addListBtn.onclick = () => {
  const name = newListInput.value.trim();
  if (!name) return;
  lists.push({ name, tasks: [] });
  newListInput.value = '';
  save();
  renderLists();
};

addTaskForm.onsubmit = (e) => {
  e.preventDefault();
  if (currentListIndex === null) return;
  const title = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;
  if (!title || !date || !time) return;
  lists[currentListIndex].tasks.push({
    title, date, time, completed: false
  });
  taskInput.value = '';
  taskDate.value = '';
  taskTime.value = '';
  save();
  renderTasks();
};

backToListsBtn.onclick = () => {
  currentListIndex = null;
  showListsSection();
};

function editTask(idx) {
  const task = lists[currentListIndex].tasks[idx];
  const newTitle = prompt('Edit task:', task.title);
  if (newTitle !== null && newTitle.trim() !== '') {
    task.title = newTitle.trim();
    save();
    renderTasks();
  }
}

function deleteList(idx) {
  if (confirm('Are you sure you want to delete this list?')) {
    lists.splice(idx, 1);
    save();
    currentListIndex = null;
    showListsSection();
  }
}
renderLists();
function renderLists() {
  listsEl.innerHTML = '';
  lists.forEach((list, idx) => {
    const li = document.createElement('li');
    li.textContent = list.name;
    li.className = idx === currentListIndex ? 'selected' : '';
    li.onclick = () => {
      currentListIndex = idx;
      showTasksSection();
    };

    // Add Delete button for each list
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.style.marginLeft = '12px';
    delBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent opening the list
      deleteList(idx);
    };
    li.appendChild(delBtn);

    listsEl.appendChild(li);
  });
}