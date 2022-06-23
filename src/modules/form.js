//get data from addProjectForm, addTaskForm, editTaskForm, then add them to the project/item list
import Task from "./Task";
import Project from "./Project";
import { renderSidebar } from "./sidebar";
import { renderContent } from "./content";

//add project form
const projectForm = document.getElementById("addProjectForm");
const addProjectBtn = document.getElementById("addProjectBtn");
const cancelAddProjectBtn = document.getElementById("cancelAddProjectBtn");
const projectTitleInput = document.getElementById("projectTitleInput");

//add task form
const addTaskForm = document.getElementById("addTaskForm");
const addTaskBtn = document.getElementById("addTaskBtn");
const cancelAddTaskBtn = document.getElementById("cancelAddTaskBtn");
const taskTitleInput = document.getElementById("taskTitleInput");
const taskPriorityInput = document.getElementById("taskPriorityInput");
const taskDesInput = document.getElementById("taskDesInput");
const taskDateInput = document.getElementById("taskDateInput");

//edit task form
const editTaskForm = document.getElementById("editTaskForm");
const editTaskBtn = document.getElementById("editTaskBtn");
const cancelEditTaskBtn = document.getElementById("cancelEditTaskBtn");
const editTaskTitleInput = document.getElementById("editTaskTitleInput");
const editTaskPriorityInput = document.getElementById("editTaskPriorityInput");
const editTaskDesInput = document.getElementById("editTaskDesInput");
const editTaskDateInput = document.getElementById("editTaskDateInput");

//TODO edit project name

function addProjectFormListeners(projects) {
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

function addAddTaskFormListeners(projects) {
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
        addTaskForm.style.visibility = "hidden";

    })

    cancelAddTaskBtn.addEventListener("click", () => {
        resetTaskForm();
        addTaskForm.style.visibility = "hidden";
    })
}

function addEditTaskFormListeners(project, taskIndex) {
    let task = project.taskList[taskIndex];

    editTaskTitleInput.value = task.title;
    editTaskPriorityInput.value = task.priority;
    editTaskDesInput.value = task.description;
    editTaskDateInput.value = task.dueDate;

    editTaskBtn.addEventListener("click", () => {
        if (editTaskTitleInput.value == "" || editTaskPriorityInput.value == "")
            return;
        const newTask = Task(editTaskTitleInput.value, editTaskDesInput.value, editTaskDateInput.value, editTaskPriorityInput.value);
        project.taskList[taskIndex] = newTask;
        renderContent(project);
        editTaskForm.style.visibility = "hidden";
    });

    cancelEditTaskBtn.addEventListener("click", () => {
        editTaskForm.style.visibility = "hidden";
    })
}

export { addProjectFormListeners, addAddTaskFormListeners, addEditTaskFormListeners }