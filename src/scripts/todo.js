export class ToDo {

    constructor(todoFormName, todoListName, totalTasksName, completedTasksName, remainingTasksName, tasks){
        this.todoForm = document.querySelector(todoFormName);
        this.todoList = document.querySelector(todoListName);
        this.totalTasks = document.querySelector(totalTasksName);
        this.completedTasks =  document.querySelector(completedTasksName);
        this.remainingTasks = document.querySelector(remainingTasksName);
        this.tasks = JSON.parse(localStorage.getItem(tasks)) || [];
    }

    main() {
        console.log(this.todoForm, "dfdf");
        if (localStorage.getItem("tasks")) {
        this.tasks.map((task) => {
            this.createTask(task, this.todoList);
        });
        }

        // submit form
        console.log(this.tasks, ":::",this.todoForm);

        this.clickAdd();


        // remove task
        this.todoList.addEventListener("click", (e) => {
        if (
            e.target.classList.contains("remove-task") ||
            e.target.parentElement.classList.contains("remove-task")
        ) {
            const taskId = e.target.closest("li").id;
            this.removeTask(taskId);
        }
        });

        // update task - change status or name
        this.todoList.addEventListener("input", (e) => {
            const taskId = e.target.closest("li").id;
            this.updateTask(taskId, e.target);
        });

        // prevent new lines with Enter
        this.todoList.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
        });
    }

    clickAdd() {
        let tasks = this.tasks;
        let todoForm = this.todoForm;
        let todoList = this.todoList;
        let createTask = this.createTask;

        todoForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = this.name;
            const inputValue = input.value;
    
            if (inputValue != "") {
                const task = {
                id: new Date().getTime(),
                name: inputValue,
                isCompleted: false
                };
                
                console.log(tasks, "여기");
                console.log(todoForm, " todoForm 여기");
                tasks.push(task);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                createTask(task, todoList);
                todoForm.reset();
            }
            input.focus();
        });
    }
    
    createTask(task, todoList) {
        console.log(task, "여기 안와?");
        console.log(todoList, "sdf??");
        const taskEl = document.createElement("li");
        taskEl.setAttribute("id", task.id);
        const taskElMarkup = `
            <div class="checkbox-wrapper">
            <input type="checkbox" id="${task.name}-${task.id}" name="tasks" ${
            task.isCompleted ? "checked" : ""
        }>
            <label for="${task.name}-${task.id}">
                <svg class="checkbox-empty">
                <use xlink:href="#checkbox_empty"></use>
                </svg>
                <svg class="checkmark">
                <use xlink:href="#checkmark"></use>
                </svg>
            </label>
            <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
            </div>
            <button class="remove-task" title="Remove ${task.name} task">
            <svg>
                <use xlink:href="#close"></use>
            </svg>
            </button>
        `;
        taskEl.innerHTML = taskElMarkup;
        todoList.appendChild(taskEl);
    }

    removeTask(taskId) {
        let tasks = this.tasks;
        tasks = tasks.filter((task) => task.id !== parseInt(taskId));
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById(taskId).remove();
    }

    updateTask(taskId, el) {
        let tasks = this.tasks;
        const task = tasks.find((task) => task.id === parseInt(taskId));

        if (el.hasAttribute("contentEditable")) {
            task.name = el.textContent;
        } else {
            const span = el.nextElementSibling.nextElementSibling;
            task.isCompleted = !task.isCompleted;
            if (task.isCompleted) {
            span.removeAttribute("contenteditable");
            el.setAttribute("checked", "");
            } else {
            el.removeAttribute("checked");
            span.setAttribute("contenteditable", "");
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

}
  