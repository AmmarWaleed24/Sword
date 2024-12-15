let tasksUl = document.querySelector(".tasks");
let addTaskBtn = document.querySelector(".add-task-btn");
let input = document.querySelector(".content .list-bx .input-bx form input");
let audio = document.querySelector("audio");
let clearBtn = document.querySelector(".clear-btn");
//Handle pageloading to add tasks
document.addEventListener("DOMContentLoaded", () => {
  createNewTaskInPage();
});
//Handel addtaskBtn when clicked
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    addNewTaskToLocalStorage(input.value);
    createNewTaskInPage();
    input.value = "";
    input.focus();
  }
});
//Handle taskUl Clicked
tasksUl.addEventListener("click", (e) => {
  //trash Button
  if (e.target.classList.contains("btn")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
  }

  //Handle complete state
  if (e.target.classList.contains("task-text")) {
    toggleCompleteState(e.target.parentElement.getAttribute("data-id"));
    if (!e.target.parentElement.classList.contains("done")) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    e.preventDefault();
  }
});

//Handle clear Button
clearBtn.addEventListener("click", () => {
  tasksUl.innerHTML = "";
  localStorage.removeItem("tasks");
});
//get tasks from localStorage
function getTasks() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
//[save/Update] tasks in localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//addNewTaskToLocalStorage
function addNewTaskToLocalStorage(taskVale) {
  let tasks = getTasks();
  tasks.push({ id: Date.now(), value: taskVale, completed: false });
  saveTasks(tasks);
}
//createNewTaskInPage
function createNewTaskInPage() {
  tasksUl.innerHTML = "";
  let tasks = getTasks();
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
    <p class="task-text">
      <input type="checkbox" />
      <span>${task.value}</span>
    </p>
    <button class="btn btn-primary delete-btn">
      <i class="fa-solid fa-trash-can"></i>
    </button>
    `;
    let checkbox = li.querySelector("input[type='checkbox']");
    if (task.completed) {
      li.classList.add("done");
      checkbox.setAttribute("checked", "true");
    }
    tasksUl.appendChild(li);
  });
}
//delete task
function deleteTask(taskId) {
  let tasks = getTasks();
  tasks = tasks.filter((task) => task.id != taskId);
  saveTasks(tasks);
  createNewTaskInPage();
}
//Task Complete State
function toggleCompleteState(taskId) {
  let tasks = getTasks();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      if (tasks[i].completed === false) tasks[i].completed = true;
      else tasks[i].completed = false;
    }
  }
  saveTasks(tasks);
  createNewTaskInPage();
}
// localStorage.clear();
