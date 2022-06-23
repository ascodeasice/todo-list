//get data from addProjectForm, addTaskForm, then add them to the project/item list
import Task from "./Task";
import Project from "./Project";
import { renderSidebar } from "./sidebar";
import { renderContent } from "./content";

const projectForm = document.getElementById("addProjectForm");
const addProjectBtn = document.getElementById("addProjectBtn");
const cancelAddProjectBtn = document.getElementById("cancelAddProjectBtn");
const projectTitleInput = document.getElementById("projectTitleInput");

const taskForm = document.getElementById("addTaskForm");
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelAddTaskBtn = document.getElementById("cancelAddTaskBtn");
const taskTitleInput = document.getElementById("taskTitleInput");
const taskPriorityInput = document.getElementById("taskPriorityInput");
const taskDesInput = document.getElementById("taskDesInput");
const taskDateInput = document.getElementById("taskDateInput");

const addProjectFormListeners = (projects) => {
    addProjectBtn.addEventListener("click", () => {
        if (projectTitleInput.value == "")
            return;
        projects.push(Project(projectTitleInput.value, []));
        renderSidebar(projects);
        projectTitleInput.value = "";
        projectForm.style.visibility = "hidden";
    })

    cancelAddProjectBtn.addEventListener("click", () => {
        projectTitleInput.value = "";
        projectForm.style.visibility = "hidden";
    })
}

function resetTaskForm() {
    taskTitleInput.value = "";
    taskPriorityInput.value = "1";
    taskDesInput.value = "";
    taskDateInput.value = "";
}

const addTaskFormListeners = (projects) => {

    addTaskBtn.addEventListener("click", () => {
        const projectWrappers = document.getElementsByClassName("projectWrapper");

        if (taskTitleInput.value == "" || taskPriorityInput.value == "")
            return;

        //get the chosen project
        for (let i = 0; i < projects.length; i++) {
            if (projectWrappers[i].classList.contains("chosenProject")) {
                let task = Task(taskTitleInput.value, taskDesInput.value, taskDateInput.value, Number(taskPriorityInput.value));
                projects[i].addTask(task);
                renderContent(projects[i]);
                break;
            }
        }

        resetTaskForm();
        taskForm.style.visibility = "hidden";

    })

    cancelAddTaskBtn.addEventListener("click", () => {
        resetTaskForm();
        taskForm.style.visibility = "hidden";
    })
}

export { addProjectFormListeners, addTaskFormListeners }