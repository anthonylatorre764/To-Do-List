console.log("testing123")   // test connection to html document


// 1. Get User Input
let newTask = ''

let form = document.querySelector("form")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    newTask = document.getElementById("inputField").value;
    document.getElementById("inputField").value = '';  // clears input field
    addNewTask()
});



// 2. Add User Input to top of To-Do list
let itemIndex = 0
const toDoList = document.getElementById("toDoList");      // get parent element

function addNewTask() {
    // Create child element
    const listItem = document.createElement('div');
    listItem.className = 'listItem';

    listItem.id = `${itemIndex}`
    console.log(`This is the new task's id: ${itemIndex}`)

    listItem.innerHTML = `
        <input type="checkbox">
        <p id="itemText${itemIndex}">${newTask}</p>
        <button class="remove-button" type="button" onclick="removeTask(${itemIndex})">x</button>
    `;
    
    // Append child element to parent element
    toDoList.appendChild(listItem);
    itemIndex++;
}



// 3. Remove a specified task from list (x button)
function removeTask(taskId) {
    // Get child element
    const selectedTask = document.getElementById(taskId)
    toDoList.removeChild(selectedTask)

    itemIndex--
}




// Bonus: Keep tasks on page after page is refreshed (local storage)