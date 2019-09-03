const input = document.querySelector(".input-text");
const button = document.querySelector("button");
const ul = document.querySelector("ul");
const btnall=document.querySelector(".btnall");
const activ=document.querySelector(".btnactive");
const comp=document.querySelector(".btncomplete");
const clear=document.querySelector(".btnclearall");
var done;
let todos =JSON.parse(localStorage.getItem("todos")) || [];

function enterKey(event) {
    if (event.keyCode === 13) {
        todos = todos.concat({text: input.value, done: false});
        input.value = " ";
        localStorage.setItem('todos' ,JSON.stringify(todos));
        display();
    }
}
function display(data = todos) {
    ul.innerHTML = data.map(( item, index) => {
        return (
            `<li class = "list">
                <input class = "checkbox" data-id = ${index} ${item.done ? "checked" : ""} type="checkbox">
                <p class = "para">${item.text}</p>
                <button class="delete-button" data-id = ${index}>x</button>
            </li>`
        )
    }).join(" ");
}
function handleDelete(event) {
    // console.log(event);
    const btnid = event.target.dataset.id;
    if (event.target.className === "delete-button") {
    // console.log(btnid);
    todos.splice(btnid, 1);
    // console.log(todos);
    localStorage.setItem('todos' ,JSON.stringify(todos));
    display();
}
}       
function handleCheck(event) {
    // console.log(event);
    if (event.target.className === "checkbox") {
        // console.log("checkbox checked");
        const checkId = event.target.dataset.id;
        // console.log(checkId);
        todos[checkId].done = !todos[checkId].done; 
    }
}
function active() {
    const act=todos.filter((data)=>data.done==false);
    display(act);
}

// function to display complted task

function complted() {
     done=todos.filter((event)=>event.done);
    display(done);

}
// function to display alltodos

function alltodo() {
    display(todos);
}

// function to clear all list

function allclear() {
    var clearall=[];
   display(clearall);

}


input.addEventListener("keyup", enterKey);
ul.addEventListener("click", handleDelete);
ul.addEventListener("click", handleCheck);
btnall.addEventListener("click",alltodo);
activ.addEventListener("click",active);
comp.addEventListener("click",complted);
clear.addEventListener("click",allclear);