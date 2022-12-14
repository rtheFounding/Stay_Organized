"use strict";

const userSelectDropdown = document.getElementById("userDropdown");
const tbody = document.getElementById("tBody");
const message = document.getElementById("message");
const btnSection = document.getElementById("btn");
const tableDisplay = document.getElementById("tableDisplay");

function loadUsers() {
    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(users => {
        for (const user of users) {
            const option = new Option(user.name);
            option.value = user.id;
            userSelectDropdown.appendChild(option);
        }
    })
}

function loadTodos() {
    btnSection.style.display = "inline-block";
    btnSection.style = "text-align: right";
    tableDisplay.style.display = "block";

    const userId = userSelectDropdown.value;

    fetch("http://localhost:8083/api/todos/byuser/" + userId)
    .then(response => response.json())
    .then(user => {
        tbody.innerHTML = "";
        for (const userTasks of user) {
            let row = tbody.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            cell1.innerHTML = userTasks.completed ? "&#10003;": "&#215;";
            cell2.innerText = userTasks.category;
            cell3.innerText = userTasks.description;
            cell4.innerText = userTasks.deadline;
            cell5.innerText = userTasks.priority;
            
        }
    })
}

function displayMesaage() {
    if(sessionStorage.savedMessage) {
        message.innerText = sessionStorage.savedMessage;
    }
}

function removeMessage() {
    if(sessionStorage.savedMessage) {
        message.innerText = "";
        sessionStorage.removeItem("message");
        sessionStorage.savedMessage = "";
    }
}

window.onload = () => {
    loadUsers();
    userSelectDropdown.onchange = loadTodos;
    displayMesaage();
    setTimeout(removeMessage, 3000);

}