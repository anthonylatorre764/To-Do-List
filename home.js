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




// 2. Add User Input to top of To-Do list
let itemIndex = 0
let stringIndex = ''
let listItem = ''
const toDoList = document.getElementById("toDoList");      // get parent element

function addNewTask() {
    // Create child element
    listItem = document.createElement('div');
    listItem.className = 'listItem';
    
    listItem.id = `${itemIndex}`;
    
    listItem.innerHTML = `
    <input type="checkbox">
    <p id="itemText${itemIndex}">${newTask}</p>
    <button class="remove-button" type="button" onclick="removeTask(${itemIndex})">x</button>
    `;
    
    // Append child element to parent element
    toDoList.appendChild(listItem);
    stringIndex = itemIndex.toString();
    updateVisibility();
    saveTask(newTask);
    itemIndex++;
}





function saveTask(task) {
    localStorage.setItem(itemIndex, task);
}

function loadTasks() {
    // Display saved tasks
    for (let i = 0; i < localStorage.length; i++) {
        // Add new element for each task
        listItem = document.createElement('div');
        listItem.className = 'listItem';
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
    
        listItem.id = `${key}`;
    
        listItem.innerHTML = `
        <input type="checkbox">
        <p id="itemText${key}">${value}</p>
        <button class="remove-button" type="button" onclick="removeTask(${key})">x</button>
        `;
        
        // Append child element to parent element
        toDoList.appendChild(listItem);
        updateVisibility();
    }

}

loadTasks();



// Clear All Tasks
function clearTasks() {
    localStorage.clear();
    toDoList.innerHTML = '';
    updateVisibility();
}


// 3. Remove a specified task from list (x button)
function removeTask(taskId) {
    // Get child element
    const selectedTask = document.getElementById(taskId);
    toDoList.removeChild(selectedTask);
    localStorage.removeItem(taskId)

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