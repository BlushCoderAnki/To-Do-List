// const inputBox = document.getElementById("input-box");
// const listContainer = document.getElementById("list-container");

// function addTask() {
//     if (inputBox.value === "") {
//         alert("You must write something.");
//     } else {
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;
//         listContainer.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML="\u00d7";
//         li.appendChild(span);
//     }
//     inputBox.value = "";
//     saveData();
// }

// listContainer.addEventListener("click", function(e){
//     if(e.target.tagName==="LI"){
//         e.target.classList.toggle("checked");
//     } else if(e.target.tagName==="SPAN"){
//         e.target.parentElement.remove();
//     }
// }, false);

// function saveData(){
//     localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask(){
//     let savedData = localStorage.getItem("data");
//     if (savedData) {
//         listContainer.innerHTML = savedData;
//     }
// }

// showTask();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something.");
    } else {
        // Create task object with text and checked status
        const task = {
            text: inputBox.value,
            checked: false
        };
        
        // Get tasks from localStorage, add new task, and save
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Render tasks
        renderTasks();
    }
    inputBox.value = "";
}

function renderTasks() {
    // Clear list and retrieve tasks from localStorage
    listContainer.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Create list items from tasks array
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = task.text;

        // Apply checked class if task is marked checked
        if (task.checked) {
            li.classList.add("checked");
        }

        // Add delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Append list item to list container
        listContainer.appendChild(li);

        // Add event listeners for toggling and deleting tasks
        li.addEventListener("click", function() {
            task.checked = !task.checked; // Toggle checked status
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
            renderTasks(); // Re-render to update UI
        });

        span.addEventListener("click", function(e) {
            tasks.splice(index, 1); // Remove task from array
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
            renderTasks(); // Re-render to update UI
            e.stopPropagation(); // Prevent event bubbling
        });
    });
}

// Load tasks on page load
renderTasks();
