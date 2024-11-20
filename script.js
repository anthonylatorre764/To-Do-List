console.log("testing123")

// Organize steps below into functions //



// 1. Get User Input
let newTask = ''
let form = document.querySelector("form")


form.addEventListener("submit", function(event) {
    event.preventDefault();
    newTask = document.getElementById("inputField").value;
    console.log(newTask)
});

// 2. Add User Input to top of To-Do list
// apendChild()



// 3. Remove a specified task from list (minus button)
// removeChild()





// Bonus: Keep tasks on page after page is refreshed (local storage)