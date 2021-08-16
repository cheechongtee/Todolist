let todolist=[]

function addTodoItem(task){
    const todoItem = {
        task,
        done:false,
        id:Date.now()
    };

    todolist.push(todoItem);
    refreshTodoList(todoItem);

    saveLocalStorage();
}

function refreshTodoList(todoItem){
    const ul = document.querySelector("#todo-list");
    const oldItem =document.querySelector(`[data-id="${todoItem.id}"]`);
    if(todoItem.delete){
        oldItem.remove();
        return;
    }
    const li = document.createElement("li");
    
    const isDone = todoItem.done ? "done" : "";
    li.setAttribute("data-id",todoItem.id);
    li.setAttribute("class",`todo-item ${isDone}`);
    li.innerHTML = ` <label for="${todoItem.id}" class="tick"></label>
    <input type="checkbox" id="${todoItem.id}">
    <span>${todoItem.task}</span>
    <button class="delete"><img src="img/button_cancel.ico"></button>`;

    if(oldItem){
        ul.replaceChild(li,oldItem);
    }else{
        ul.insertBefore(li,ul.firstElementChild);
    }
}
todoItem => todoItem.id=== Number(id);
function toggleDone(id){
    const index = todolist.findIndex(todoItem => todoItem.id=== Number(id)  
    ); 
     todolist[index].done = !todolist[index].done;
     refreshTodoList(todolist[index]);
     saveLocalStorage();
}

function deleteTodoItem(id){
    const index =todolist.findIndex(todoItem=>todoItem.id===Number(id));
    todolist[index].delete =true;
    refreshTodoList(todolist[index]);    
    todolist = todolist.filter(todoItem => todoItem.id !==Number(id));

        saveLocalStorage();
}

function saveLocalStorage(){
    localStorage.setItem("todo-list",JSON.stringify(todolist));
}



const form = document.querySelector("#todo-form");

form.addEventListener("submit",event=>{
    event.preventDefault();
    const input =document.querySelector("#todo-input");
    const task = input.value.trim();



    if(task !== ""){
        addTodoItem(task);
        input.value="";
    }else{
        alert("Plaese enter an item");
    }

});

const ul =document.querySelector("#todo-list");
ul.addEventListener("click",event=>{
    const id = event.target.parentElement.dataset.id;

    if(event.target.classList.contains("tick"))
    {
        toggleDone(id);
    } else if(event.target.classList.contains("delete")){
        console.log(`DElete id =${id}`);
        deleteTodoItem(id);
        console.log(todolist);
    }
});

document.addEventListener("DOMContentLoaded", () =>{
    const todolistString = localStorage.getItem("todo-list");

    if(todolistString){
        todolist = JSON.parse(todolistString);
        for (let i = 0; i < todolistString.length; i++){
            refreshTodoList(todolist[i]);
        }
    }
});