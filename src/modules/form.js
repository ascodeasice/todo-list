//get data from addProjectForm, addTaskForm, editTaskForm, then add them to the project/item list
import Task from "./Task";
import Project from "./Project";
import { renderSidebar } from "./sidebar";
import { renderContent } from "./content";
import { isUserSignedIn } from "../firebase_modules/auth";
import { saveTodo, saveProject } from "../firebase_modules/firestore";

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

function addProjectFormListeners(projects) {
  addProjectBtn.addEventListener("click", () => {
    if (projectTitleInput.value == "")
      return;
    const newProject = Project(projectTitleInput.value, []);
    projects.push(newProject);
    if (isUserSignedIn()) {
      saveProject(newProject);
    }
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

    if (taskTitleInput.value == "" || taskPriorityInput.value == "" || Number(taskPriorityInput.value) < 1 || Number(taskPriorityInput.value) > 4)
      return;

    //get the chosen project
    for (let i = 0; i < projects.length; i++) {
      if (projectWrappers[i].classList.contains("chosenProject")) {
        let task = Task(taskTitleInput.value, taskDesInput.value, taskDateInput.value, Number(taskPriorityInput.value));
        projects[i].addTask(task);
        if (isUserSignedIn) {
          saveTodo(projects[i], task);
        }

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

export { addProjectFormListeners, addAddTaskFormListeners }