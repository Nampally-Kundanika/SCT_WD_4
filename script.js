const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// Array to Store Tasks

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save Tasks

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Update Overview

function updateOverview() {

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}

// Display Tasks

function displayTasks() {

    taskList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => {

        const matchesSearch = task.name.toLowerCase().includes(searchText);

        const matchesFilter =

            currentFilter === "all" ||

            (currentFilter === "completed" && task.completed) ||

            (currentFilter === "pending" && !task.completed);

        return matchesSearch && matchesFilter;

    });

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

    filteredTasks.forEach(task => {

        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {

            li.classList.add("completed");

        }

        let borderColor = "#7E9C73";

        if (task.priority === "Medium") {

            borderColor = "#D8B55B";

        }

        if (task.priority === "High") {

            borderColor = "#D97B66";

        }

        li.style.borderLeftColor = borderColor;

        li.innerHTML = `

            <div class="task-top">

                <div class="task-title">${task.name}</div>

                <strong>${task.priority}</strong>

            </div>

            <div class="task-info">

                📅 ${task.date || "No Date"}

                &nbsp;&nbsp;&nbsp;

                ⏰ ${task.time || "No Time"}

            </div>

            <div class="task-buttons">

                <button class="complete" onclick="toggleComplete(${originalIndex})">

                    ${task.completed ? "Undo" : "Complete"}

                </button>

                <button class="edit" onclick="editTask(${originalIndex})">

                    Edit

                </button>

                <button class="delete" onclick="deleteTask(${originalIndex})">

                    Delete

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

    updateOverview();

    saveTasks();

}

// Add Task

addTaskBtn.addEventListener("click", () => {

    if (taskInput.value.trim() === "") {

        alert("Please enter a task.");

        return;

    }

    const newTask = {

        name: taskInput.value,

        date: taskDate.value,

        time: taskTime.value,

        priority: priority.value,

        completed: false

    };

    tasks.push(newTask);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    priority.value = "Low";

    displayTasks();

});

// Complete Task

function toggleComplete(index) {

    tasks[index].completed = !tasks[index].completed;

    displayTasks();

}

// Delete Task

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        displayTasks();

    }

}




// Filter  

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        displayTasks();

    });

});

// Initial Load 

displayTasks();



// Edit Task

function editTask(index){

    taskInput.value=tasks[index].name;

    taskDate.value=tasks[index].date;

    taskTime.value=tasks[index].time;

    priority.value=tasks[index].priority;

    tasks.splice(index,1);

    displayTasks();

}

// Load Existing Tasks

displayTasks();


// Search

searchInput.addEventListener("input",function(){

    displayTasks();

});

// Filter

filterButtons.forEach(button=>{

    button.addEventListener("click",function(){

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        displayTasks();

    });

});
const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

if (hour < 12) {

    greeting.textContent = "Good Morning 👋";

}

else if (hour < 17) {

    greeting.textContent = "Good Afternoon ☀️";

}

else {

    greeting.textContent = "Good Evening 🌙";

}