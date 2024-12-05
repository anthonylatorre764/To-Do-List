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
const toDoList = document.getElementById("toDoList");      // get parent element

function addNewTask() {
    // Create child element
    const listItem = document.createElement('div');
    listItem.className = 'listItem';

    listItem.id = `${itemIndex}`;
    console.log(`This is the new task's id: ${itemIndex}`);

    listItem.innerHTML = `
        <input type="checkbox">
        <p id="itemText${itemIndex}">${newTask}</p>
        <button class="remove-button" type="button" onclick="removeTask(${itemIndex})">x</button>
    `;
    
    // Append child element to parent element
    toDoList.appendChild(listItem);
    itemIndex++;
    updateVisibility();
}



// 3. Remove a specified task from list (x button)
function removeTask(taskId) {
    // Get child element
    const selectedTask = document.getElementById(taskId);
    toDoList.removeChild(selectedTask);

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

const capButton = document.getElementById("capButton");
capButton.style.backgroundColor = 'green';

capButton.addEventListener("click", function(){
    if (capButton.style.backgroundColor === 'green') {
        capButton.style.backgroundColor = 'red';
    } else {
        capButton.style.backgroundColor = 'green';
    }
});



// Bonus: Keep tasks on page after page is refreshed (local storage)