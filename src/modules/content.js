//control the task content on the right side
import Plus from "../assets/plus.svg"
import Circle from "../assets/circle.svg"
import TrashCan from "../assets/trash-can.svg"
import Edit from "../assets/edit.svg"
import { addEditTaskFormListeners } from "./form.js"

const contentDiv = document.getElementById("content");
const editForm = document.getElementById("editTaskForm");

//show the add task form
function addAddTaskListener() {
    const addTask = document.getElementById("addTaskContainer");
    addTask.addEventListener("click", () => {
        const form = document.getElementById("addTaskForm");
        form.style.visibility = "visible";
    })
}

function addCompleteIconListener(project) {
    const icons = document.getElementsByClassName("completeIcon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", function () {
            project.taskList.splice(i, 1);
            renderContent(project);
        })
    }
}

function addDeleteIconListener(project) {
    const icons = document.getElementsByClassName("delTaskIcon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", () => {
            project.taskList.splice(i, 1);
            renderContent(project);
        })
    }
}

//show the edit form, and fill inputs with current task info
function addEditTaskIconListener(project) {
    const icons = document.getElementsByClassName("editTaskIcon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", () => {
            editForm.style.visibility = "visible";
            addEditTaskFormListeners(project, i);//click button will change the i-th task
        })
    }
}

function renderContent(project) {
    if (!project)
        return;
    contentDiv.innerText = "";
    project.taskList.forEach(task => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("taskWrapper");

        const completeIcon = document.createElement("img");
        completeIcon.src = Circle;
        completeIcon.classList.add("completeIcon");
        completeIcon.classList.add("priority" + String(task.priority) + "Icon");

        const taskText = document.createElement("p");
        taskText.classList.add("taskText");
        taskText.innerText = task.title;

        const taskDes = document.createElement("p");//TODO change task title to heading
        taskDes.classList.add("taskInfo");
        taskDes.classList.add("taskDes");//for position in grid
        taskDes.innerText = task.description;

        const taskDate = document.createElement("p");
        taskDate.classList.add("taskInfo");
        taskDate.classList.add("taskDate");//for position in grid
        taskDate.innerText = task.dueDate;//NOTE might chnage the format

        const editIcon = document.createElement("img");
        editIcon.src = Edit;
        editIcon.classList.add("editTaskIcon");

        const deleteIcon = document.createElement("img");
        deleteIcon.src = TrashCan;
        deleteIcon.classList.add("delTaskIcon");

        wrapper.appendChild(completeIcon);
        wrapper.appendChild(taskText);
        wrapper.appendChild(taskDes);
        wrapper.appendChild(taskDate);
        wrapper.appendChild(editIcon);
        wrapper.appendChild(deleteIcon);
        contentDiv.appendChild(wrapper);
    })

    //render "add tasks"
    const container = document.createElement("div");
    container.setAttribute("id", "addTaskContainer");

    const addIcon = document.createElement("img");
    addIcon.src = Plus;

    const addText = document.createElement("p");
    addText.innerText = "Add task";

    container.appendChild(addIcon);
    container.appendChild(addText);
    contentDiv.appendChild(container);

    addCompleteIconListener(project);
    addDeleteIconListener(project);
    addEditTaskIconListener(project);
    addAddTaskListener();
}

export { renderContent };