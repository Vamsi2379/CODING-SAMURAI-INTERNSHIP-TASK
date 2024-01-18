
// Load tasks from local storage on page load
window.onload = function() {
    loadTasks();
};

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var taskList = document.getElementById("taskList");

        var li = document.createElement("li");
        li.classList.add("task");

        var taskTextElement = document.createElement("span");
        taskTextElement.classList.add("task-text");
        taskTextElement.textContent = taskText;

        var completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.onclick = function() {
            li.classList.toggle("completed");
            saveTasks();
        };

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-task-btn");
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };

        li.appendChild(taskTextElement);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = "";

        // Save tasks to local storage
        saveTasks();
    }
}

function saveTasks() {
    var tasks = [];
    var taskList = document.getElementById("taskList").children;

    for (var i = 0; i < taskList.length; i++) {
        var taskText = taskList[i].querySelector(".task-text").textContent;
        var isCompleted = taskList[i].classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);

        var taskList = document.getElementById("taskList");

        tasks.forEach(function(task) {
            var li = document.createElement("li");
            li.classList.add("task");

            var taskTextElement = document.createElement("span");
            taskTextElement.classList.add("task-text");
            taskTextElement.textContent = task.text;

            var completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.classList.add("complete-btn");
            completeBtn.onclick = function() {
                li.classList.toggle("completed");
                saveTasks();
            }; 


            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-task-btn");
            deleteBtn.onclick = function() {
                li.remove();
                saveTasks();
            };

            li.appendChild(taskTextElement);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);

            if (task.completed) {
                li.classList.add("completed");
            }

            taskList.appendChild(li);
        });
    }
}

function filterTasks() {
var filterStatus = document.getElementById("filterStatus").value;
var taskList = document.getElementById("taskList").children;

for (var i = 0; i < taskList.length; i++) {
var isCompleted = taskList[i].classList.contains("completed");

if (filterStatus === "all" || (filterStatus === "pending" && !isCompleted) || (filterStatus === "completed" && isCompleted)) {
    taskList[i].style.display = "";  // Set display to default value
} else {
    taskList[i].style.display = "none";
}
}
}


function sortTasks() {
    var sortOption = document.getElementById("sortOption").value;
    var taskList = document.getElementById("taskList");

    var tasks = Array.from(taskList.children);
    
    if (sortOption === "priority") {
        tasks.sort(function(a, b) {
            var priorityA = a.querySelector(".priority").textContent;
            var priorityB = b.querySelector(".priority").textContent;
            return priorityA - priorityB;
        });
    } else if (sortOption === "dueDate") {
        tasks.sort(function(a, b) {
            var dueDateA = new Date(a.querySelector(".due-date").textContent);
            var dueDateB = new Date(b.querySelector(".due-date").textContent);
            return dueDateA - dueDateB;
        });
    }

    taskList.innerHTML = "";
    tasks.forEach(function(task) {
        taskList.appendChild(task);
    });
}