const API = "/tasks";

async function loadTasks(){

try{

const res = await fetch(API);
const tasks = await res.json();

const container = document.getElementById("tasks");

container.innerHTML = "";

tasks.forEach(task => {

const div = document.createElement("div");

div.className = "task";

div.innerHTML = `
<h3>${task.title}</h3>
<p>${task.description}</p>
<small>${task.time}</small>
<br>
<button onclick="completeTask(${task.id})">Complete</button>
`;

container.appendChild(div);

});

}catch(error){

console.error("Error loading tasks:", error);

}

}



async function addTask(){

const title = document.getElementById("title").value.trim();
const description = document.getElementById("description").value.trim();
const time = document.getElementById("time").value.trim();

if(!title || !description || !time){

alert("Please fill all fields");

return;

}

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,description,time})
});


document.getElementById("title").value = "";
document.getElementById("description").value = "";
document.getElementById("time").value = "";

loadTasks();

}



async function completeTask(id){

try{

await fetch(`${API}/${id}`,{
method:"DELETE"
});

loadTasks();

}catch(error){

console.error("Error completing task:", error);

}

}


loadTasks();