const mainContainer = document.querySelector(".main-container");
mainContainer.classList.toggle('hidden')

const addTaskBtn = document.getElementById("add-task-btn");
const addTaskContainer = document.querySelector(".add-task-container");
const taskContainer = document.getElementById('task-container');
const taskName = document.getElementById('task-name');
const taskDueDate = document.getElementById('task-due-date');
const taskDescription = document.getElementById('task-description');
const confirmTaskBtn = document.getElementById('confirm-task-btn');
const cancelTaskBtn = document.getElementById('cancel-task-btn');
const form = document.querySelector("form");

let taskDataArr = [];
let currentTask = {};
let ID = 0;

const clearInputs = () => {
  taskName.value = "";
  taskDueDate.value = "";
  taskDescription.value = "";
}

const addTasksForm = () => {
  mainContainer.classList.toggle('hidden')
  addTaskContainer.classList.toggle('hidden')
};

const cancelAddingTask = () => {
  clearInputs();
  mainContainer.classList.toggle('hidden');
  addTaskContainer.classList.toggle('hidden');
}

const addTask = () => {
  
  currentTask = {
    id: ID++,
    name: taskName.value.trim().toLowerCase(),
    dueDate: taskDueDate.value.trim().toLowerCase(),
    description: taskDescription.value.trim().toLowerCase()
  }
  taskDataArr.unshift(currentTask)
  
  displayTasks();
  clearInputs();
  
  mainContainer.classList.toggle('hidden');
  addTaskContainer.classList.toggle('hidden');
  
}


const displayTasks = () => {
  
  taskContainer.innerHTML = "";
  
  taskDataArr.forEach(({id, name, dueDate, description}) => {
    taskContainer.innerHTML += `
    <div class="task-card">
    <button class="deleteBtn" id="${id}">x</button>
    <span><strong>Task Name: </strong>${name}</span>
    <span><strong>Due Date: </strong>${dueDate}</span>
    <span><strong>Description: </strong>${description}</span>
    </div>
  `;
    
  });
}

addTaskBtn.addEventListener("click", addTasksForm);
cancelTaskBtn.addEventListener("click", cancelAddingTask);

form.addEventListener("submit", event => {
  event.preventDefault();
  addTask();
});

taskContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    const taskId = parseInt(event.target.id);
    taskDataArr = taskDataArr.filter(task => task.id !== taskId);
    displayTasks();
  }
});



