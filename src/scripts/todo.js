
import { dateDiff } from './timeDiff.js';
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

        // update task - change status or content
        console.log(this.todoList, "여기 뭐야 ??ㄴ");
        this.todoList.addEventListener("input", (e) => {
            console.log("여기 오니 ?");
            const taskId = e.target.closest("li");
            this.updateTask(taskId, e.target);
        });

        //update date 
        let btnDateEdit = document.querySelectorAll(".btn-date-edit");
        console.log("btnDateEdit : ", btnDateEdit);
        console.log("a : ", btnDateEdit);
        for (let eachBtn = 0; eachBtn < btnDateEdit.length; eachBtn++){
            console.log(btnDateEdit[eachBtn], "여기! ");
            btnDateEdit[eachBtn].addEventListener("click", (e) =>{
                console.log(e.target.closest("li"), "sdfsdfdsfsdf");
                console.log(e.target.previousElementSibling, "예기 ?");
                console.log("여기 뭐야 ? ", e.target.HTML);
                let closeDate = e.target.previousElementSibling;
                closeDate.classList.toggle('hideDate');
                // e.target.appenkdChild();
            });
        }

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
            const myContent = this.myContent;
            const myDue = this.myDue;

            const myContentValue = myContent.value;
            const myDueValue = myDue.value;
    
            if (myContentValue != "") { // 빈칸이 아니라면 
                const task = {
                id: myContentValue + "-" + new Date().getTime(),
                content: myContentValue,
                dueDate : myDueValue,
                remainingDate : dateDiff(myDueValue)? "  D-" + dateDiff(myDueValue) : "",
                isCompleted: false
                };
                tasks.push(task);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                createTask(task, todoList);
                todoForm.reset();
            }
            myContent.focus(); // 내용 입력칸에 focus 를 둔다 
        });
    }
    
    createTask(task, todoList) {
        const taskEl = document.createElement("li");
        taskEl.setAttribute("id", task.id);
        const taskElMarkup = `
            <div class="checkbox-wrapper">
            <input type="checkbox" id="${task.content}-${task.id}" name="tasks" ${
            task.isCompleted ? "checked" : ""
        }>
            <label for="${task.content}-${task.id}">
                <svg class="checkbox-empty">
                <use xlink:href="#checkbox_empty"></use>
                </svg>
                <svg class="checkmark">
                <use xlink:href="#checkmark"></use>
                </svg>
            </label>
            <span ${!task.isCompleted ? "contenteditable" : ""}>${task.content}</span>
            <span class="remaining-date" value="${task.dueDate ? task.dueDate : ""}">${task.remainingDate? "  " + task.remainingDate : ""}</span>
            <input type="date" class="date-edit-form" id="${task.content}-${task.dueDate}-form" value="${task.dueDate}">
            <button class="btn-date-edit" id="${task.content}-${task.dueDate}-date-btn">날짜 수정</button>
            </div>
            <button class="remove-task" title="Remove ${task.content} task">
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
        tasks = tasks.filter((task) => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById(taskId).remove();
    }

    updateTask(taskId, el) {
        console.log(el, "sdf")
        let tasks = this.tasks;
        const task = tasks.find((task) => task.id === parseInt(taskId));

        if (el.hasAttribute("contentEditable")) {
            task.content = el.textContent;
        } else {
            console.log("여기로 오지 ?");
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
  