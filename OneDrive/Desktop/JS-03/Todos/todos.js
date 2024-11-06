const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAllBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function showTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const todoItem = document.createElement("li");
        const todoText = document.createElement("span");
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        const dateTime = document.createElement("span");
        dateTime.classList.add("date-time");
        dateTime.textContent = todo.dateTime;
        todoItem.appendChild(dateTime);

        const editBtn = createButton("fas fa-pencil-alt", () => editTodo(index));
        todoItem.appendChild(editBtn);

        const deleteBtn = createButton("fas fa-trash", () => deleteTodo(index));
        todoItem.appendChild(deleteBtn);

        todoList.appendChild(todoItem);
    });
}

function createButton(iconClass, clickHandler) {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add(...iconClass.split(" "));
    button.appendChild(icon);
    button.addEventListener("click", clickHandler);
    return button;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text !== "") {
        const currentDateTime = new Date().toLocaleString();
        todos.push({ text, dateTime: currentDateTime });
        localStorage.setItem("todos", JSON.stringify(todos));
        todoInput.value = "";
        showTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos();
}

function editTodo(index) {
    const todo = todos[index];
    const newText = prompt("Edit your task:", todo.text);
    if (newText && newText.trim() !== "") {
        todos[index].text = newText.trim();
        todos[index].dateTime = new Date().toLocaleString();
        localStorage.setItem("todos", JSON.stringify(todos));
        showTodos();
    }
}

function clearAll() {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos();
}

addBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", clearAll);
showTodos();
