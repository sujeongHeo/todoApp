import { ToDo } from './scripts/todo.js';
import './styles/style.css';

// 클래스 이름, localStorage key 값 ( tasks ) 명시
let todoFormName = ".todo-form",
    todoListName = ".todo-list",
    totalTasksName = ".total-tasks span",
    completedTasksName = ".completed-tasks span",
    remainingTasksName = ".remaining-tasks span",
    tasks = "tasks";

const todo = new ToDo(todoFormName, todoListName, totalTasksName, completedTasksName, remainingTasksName, tasks);
todo.main();
