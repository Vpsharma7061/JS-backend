const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAllBtn");
const archiveListBtn = document.getElementById("archiveListBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let archivedTodos = JSON.parse(localStorage.getItem("archivedTodos")) || [];
let editIndex = null;
let selectedTasks = [];
let showArchived = false;

function checkExpiration() {
    const currentTime = new Date().getTime();
    todos.forEach(todo => {
        const expirationTime = new Date(todo.expirationDate).getTime();
        const timeRemaining = expirationTime - currentTime;

        if (timeRemaining <= 0) {
            todo.isDone = true;
            todo.timeRemaining = 'Expired';
        } else {
            const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            todo.timeRemaining = `${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

setInterval(checkExpiration, 1000);

function showTodos() {
    todoList.innerHTML = "";
    selectedTasks = [];

    const taskList = showArchived ? archivedTodos : todos;

    taskList.forEach((todo, index) => {
        const todoItem = document.createElement("li");

        if (todo.isDone) {
            todoItem.classList.add("done");
        }

        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox-container");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isChecked || false;
        checkbox.addEventListener("change", () => handleCheckboxChange(index, checkbox));
        checkboxContainer.appendChild(checkbox);

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        const taskText = document.createElement("span");
        taskText.textContent = todo.text;
        taskContainer.appendChild(taskText);

        const creationDateText = document.createElement("span");
        creationDateText.classList.add("creation-date-text");
        creationDateText.textContent = `Created on: ${todo.dateTime}`;
        taskContainer.appendChild(creationDateText);

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");

        const expirationText = document.createElement("span");
        expirationText.classList.add("expiration-text");
        expirationText.textContent = todo.isDone ? "Expired" : `Expires in ${todo.timeRemaining}`;
        iconContainer.appendChild(expirationText);

        const markAsDoneBtn = createButton("fas fa-check-circle", () => markAsDone(index), "Mark as Done");
        const archiveBtn = createButton("fas fa-archive", () => archiveTask(index), "Archive");
        const editBtn = createButton("fas fa-pencil-alt", () => editTodo(index), "Edit");
        const deleteBtn = createButton("fas fa-trash", () => deleteTodo(index), "Delete");

        iconContainer.appendChild(markAsDoneBtn);
        iconContainer.appendChild(archiveBtn);
        iconContainer.appendChild(editBtn);
        iconContainer.appendChild(deleteBtn);

        todoItem.appendChild(checkboxContainer);
        todoItem.appendChild(taskContainer);
        todoItem.appendChild(iconContainer);

        todoList.appendChild(todoItem);
    });

    archiveListBtn.style.display = "inline-block";

    if (taskList.length > 0) {
        clearAllBtn.style.display = "inline-block";
        todoList.appendChild(deleteSelectedBtn);
    } else {
        clearAllBtn.style.display = "none";
        deleteSelectedBtn.style.display = "none";
    }

    todoList.style.display = "block";
}

function markAsDone(index) {
    const taskList = showArchived ? archivedTodos : todos;
    taskList[index].isDone = !taskList[index].isDone;
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

function handleCheckboxChange(index, checkbox) {
    const taskList = showArchived ? archivedTodos : todos;
    taskList[index].isChecked = checkbox.checked;

    const selectedTasks = taskList.filter(todo => todo.isChecked);
    if (selectedTasks.length > 0) {
        deleteSelectedBtn.style.display = "inline-block";
    } else {
        deleteSelectedBtn.style.display = "none";
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

function deleteSelectedTasks() {
    todos = todos.filter(todo => !todo.isChecked);
    archivedTodos = archivedTodos.filter(todo => !todo.isChecked);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

function archiveTask(index) {
    const taskList = showArchived ? archivedTodos : todos;
    const archivedTask = taskList.splice(index, 1)[0];
    archivedTodos.push(archivedTask);

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

function createButton(iconClass, clickHandler, titleText) {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add(...iconClass.split(" "));
    button.appendChild(icon);
    button.addEventListener("click", clickHandler);
    button.setAttribute("title", titleText);

    return button;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") return;

    const currentDateTime = new Date().toLocaleString();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 4);
    const expirationDateString = expirationDate.toLocaleString();

    if (editIndex !== null) {
        todos[editIndex].text = text;
        todos[editIndex].expirationDate = expirationDateString;
        todos[editIndex].dateTime = currentDateTime;
        editIndex = null;
        addBtn.textContent = "Add";
    } else {
        todos.push({ text, dateTime: currentDateTime, expirationDate: expirationDateString, isDone: false });
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    showTodos();
}

function deleteTodo(index) {
    const taskList = showArchived ? archivedTodos : todos;
    taskList.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

function editTodo(index) {
    const taskList = showArchived ? archivedTodos : todos;
    const todo = taskList[index];
    todoInput.value = todo.text;
    todoInput.focus();
    editIndex = index;
    addBtn.textContent = "Update";
}

function clearAll() {
    todos = [];
    archivedTodos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archivedTodos", JSON.stringify(archivedTodos));
    showTodos();
}

archiveListBtn.addEventListener("click", () => {
    showArchived = !showArchived;
    if (showArchived) {
        archiveListBtn.textContent = "Back to List";
    } else {
        archiveListBtn.textContent = "Archive List";
    }
    showTodos();
});

deleteSelectedBtn.addEventListener("click", deleteSelectedTasks);
addBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", clearAll);

showTodos();
