console.log("testing123")   // test connection to home.html



// 1. Get User Input
let newTask = ''

let form = document.querySelector("form")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    newTask = document.getElementById("inputField").value;
    if (capitalize) {
        newTask = capitalizeWord(newTask)
    }
    document.getElementById("inputField").value = '';  // clears input field
    addNewTask();
});




// 2. Add User Input to To-Do list
let parsedIndex = JSON.parse(localStorage.getItem('index'));
let listItem = '';
let tasksObject = null;
const toDoList = document.getElementById("toDoList");     // get parent element

function addNewTask() {
    // Create child element
    listItem = document.createElement('div');
    listItem.className = 'listItem';
    
    listItem.id = `${parsedIndex}`;
    
    listItem.innerHTML = `
    <input type="checkbox">
    <p id="itemText${parsedIndex}">${newTask}</p>
    <button class="remove-button" type="button"
    onclick="removeTask(${parsedIndex})">x</button>
    `;
    
    // Append child element to parent element
    toDoList.appendChild(listItem);
    saveTask(newTask);
    updateVisibility();

    updateIndex('+');
}


function updateIndex(sign) {
    parsedIndex = JSON.parse(localStorage.getItem('index'));
    console.log(parsedIndex);

    if (sign === '+') {
        parsedIndex++;
    } else {
        parsedIndex--;
    }

    localStorage.setItem('index', JSON.stringify(parsedIndex));
}



function saveTask(task) {
    // get all tasks as an object
    tasksObject = JSON.parse(localStorage.getItem("tasks"));
    tasksObject[parsedIndex] = task;

    // put updated object back into localStorage
    localStorage.setItem('tasks', JSON.stringify(tasksObject));
}



function loadTasks() {
    // Display saved tasks
    tasksObject = JSON.parse(localStorage.getItem("tasks")) || {};
    let tasksLength = Object.keys(tasksObject).length;

    // Add new element for each task
    for (let i = 0; i < tasksLength; i++) {
        listItem = document.createElement('div');
        listItem.className = 'listItem';
        let key = i;
        let value = tasksObject[key];    
        listItem.id = `${key}`;
    
        listItem.innerHTML = `
        <input type="checkbox">
        <p id="itemText${key.toString()}">${value}</p>
        <button class="remove-button" type="button"
        onclick="removeTask(${key})">x</button>
        `;
        
        // Append child element to parent element
        toDoList.appendChild(listItem);
        updateVisibility();
    }
}

loadTasks();



// Clear All Tasks
function clearTasks() {
    localStorage.setItem('tasks', JSON.stringify({}));
    localStorage.setItem('index', 0);
    toDoList.innerHTML = '';
    updateVisibility();
}



// 3. Remove a specified task from list (x button)
function removeTask(taskId) {
    // Remove from frontend
    const selectedTask = document.getElementById(taskId);
    toDoList.removeChild(selectedTask);
    
    // Remove from backend
    tasksObject = JSON.parse(localStorage.getItem("tasks"));
    delete tasksObject[taskId];

    // Re-index tasks
    let tasksLength = Object.keys(tasksObject).length;

    if (tasksLength > 0) {
        let values = Object.values(tasksObject);
        tasksObject = {};
        for (let i = 0; i < tasksLength; i++) {
            tasksObject[i] = values[i];
        }
        localStorage.setItem('tasks', JSON.stringify(tasksObject));
    }

    updateIndex('-');
    updateVisibility();
}



// checks if #toDoList has any child elements
function updateVisibility() {
    if (toDoList.children.length > 0) {
        toDoList.style.display = 'block';
    } else {
        toDoList.style.display = 'none';
    }
}



// capitalizes the first word of user's input
function capitalizeWord(task) {
    return task.charAt(0).toUpperCase() + task.slice(1);
}



// toggles setting for capitalizing the first word
let capitalize = true;

function toggleCap() {
    if (capitalize) {
        capitalize = false;
    } else {
        capitalize = true;
    }
}