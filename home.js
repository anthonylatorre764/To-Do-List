console.log("testing123")   // test connection to html document


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
let itemIndex = 0
let stringIndex = ''
let listItem = ''
const toDoList = document.getElementById("toDoList");     // get parent element

function addNewTask() {
    // Create child element
    listItem = document.createElement('div');
    listItem.className = 'listItem';
    
    listItem.id = `${itemIndex}`;
    
    listItem.innerHTML = `
    <input type="checkbox">
    <p id="itemText${itemIndex}">${newTask}</p>
    <button class="remove-button" type="button"
    onclick="removeTask(${itemIndex})">x</button>
    `;
    
    // Append child element to parent element
    toDoList.appendChild(listItem);
    stringIndex = itemIndex.toString();
    updateVisibility();
    saveTask(newTask);
    itemIndex++;
}



let allTasks = {};
localStorage.setItem('tasks', JSON.stringify(allTasks));


function saveTask(task) {
    allTasks.itemIndex = task
    console.log(itemIndex)
    console.log(allTasks)
    console.log("saveTask has executed.")   // for testing
}

function loadTasks() {
    // Display saved tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let tasksLength = Object.keys(tasks).length;

    console.log(tasksLength)
    for (let i = 0; i < tasksLength; i++) {
        // Add new element for each task
        listItem = document.createElement('div');
        listItem.className = 'listItem';
        let key = localStorage.tasks[i];
        let value = localStorage.tasks[key];
    
        listItem.id = `${key}`;
    
        listItem.innerHTML = `
        <input type="checkbox">
        <p id="itemText${key}">${value}</p>
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
    allTasks = {};
    toDoList.innerHTML = '';
    updateVisibility();
}


// 3. Remove a specified task from list (x button)
function removeTask(taskId) {
    // Get / remove child element from frontend
    const selectedTask = document.getElementById(taskId);
    toDoList.removeChild(selectedTask);
    
    // Remove from backend (localStorage)
    // localStorage.removeItem(tasks[taskId]);
    delete allTasks[taskId]
    console.log(allTasks)
    itemIndex--;
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