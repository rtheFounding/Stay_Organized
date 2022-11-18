const base = "http://localhost:8083/api/";

//USERS
const users = document.getElementById("userDropdown");
function onUserData(userList) {
  userList.forEach((u) => {
    users.innerHTML += `<option value="${u.id}">${u.name}</option>`;
  });
}
fetch(base + "users")
  .then((r) => r.json())
  .then(onUserData);

//CATEGORIES
const category = document.getElementById("categoryDropdown");
function onCategoryData(categoryList) {
  categoryList.forEach((u) => {
    category.innerHTML += `<option value="${u.name}">${u.name}</option>`;
  });
}
fetch(base + "categories")
  .then((r) => r.json())
  .then(onCategoryData);

// ADD/SAVE NEW TODO

document.getElementById("add").addEventListener("click", (e) => {
  const taskData = {
    userid: document.getElementById("userDropdown").value,
    category: document.getElementById("categoryDropdown").value,
    description: document.getElementById("taskDescription").value,
    deadline: document.getElementById("taskDeadline").value,
    priority: document.getElementById("priorityDropdown").value,
  };

  fetch(base + "todos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(taskData),
  })
    .then((r) => r.json())
    .then((j) => {
      console.log(j);
      sessionStorage.savedMessage = "New task has been Added."
      location = "todos.html"
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("message").innerText =
        "an unexpected error occured.";
    });
});

function cancelAddingTask() {
  sessionStorage.savedMessage = "No task Added.";
  location = "todos.html";
}

document
  .getElementById("cancelBtn")
  .addEventListener("click", cancelAddingTask);
