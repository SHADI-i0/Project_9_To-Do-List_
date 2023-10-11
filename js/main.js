let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete");

// Empty Array to Store The Tasks
let arrayOfTasks = [];

// Add task
submit.addEventListener("click", function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
});

// delete Task All
deleteAll.addEventListener("click", function () {
    tasksDiv.innerHTML = "";
    window.localStorage.clear();
    arrayOfTasks = [""];
});

// Click On task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Element From Page
        e.target.parentElement.remove();
        // Remove Task From Local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // console.log(arrayOfTasks) //? Testing Array
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add To local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
    // For Testing
    //? console.log(arrayOfTasks)
    //? console.log(JSON.stringify(arrayOfTasks))
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div to DIv tasks container
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
    addElementsToPageFrom(arrayOfTasks);
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(Id) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == Id) {
            if (arrayOfTasks[i].completed == false) {
                arrayOfTasks[i].completed = true;
            } else {
                arrayOfTasks[i].completed = false;
            }
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}
