console.log("testing123")

// Organize steps below into functions //



// 1. Get User Input
let newTask = ''
let form = document.querySelector("form")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    newTask = document.getElementById("inputField").value;
    addNewTask()
});



// 2. Add User Input to top of To-Do list
let paragraphIndex = 0

function addNewTask() {
    // Get parent element
    const toDoList = document.getElementById("toDoList");
    
    // Create child element
    const listItem = document.createElement('div');
    listItem.className = 'listItem';
    
    listItem.innerHTML = `
        <input type="checkbox">
        <p id="itemText${paragraphIndex}">${newTask}</p>
    `;
    
    // Append child element to parent element
    toDoList.appendChild(listItem);
    paragraphIndex++;
}



// 3. Remove a specified task from list (minus button)
// removeChild()

function removeTask() {


    paragraphIndex--
}




// Bonus: Keep tasks on page after page is refreshed (local storage)