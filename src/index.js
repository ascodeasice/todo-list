import Task from "./modules/Task.js";
import Project from "./modules/Project.js";
import { renderSidebar } from "./modules/sidebar.js";
import { renderContent } from "./modules/content.js";
import './style.css';

let projects = [Project("Inbox", [Task("Example"), Task()]), Project("Coding", [Task()])];
renderSidebar(projects);
renderContent(projects[0]);
document.getElementById("Inbox").classList.add("chosenProject");
const projectForm = document.getElementById("addProjectForm");

document.getElementById("addProjectBtn").addEventListener("click", () => {
    const titleInput = document.getElementById("projectTitleInput");
    if (titleInput.value == "")
        return;
    projects.push(Project(titleInput.value, []));
    renderSidebar(projects);
    titleInput.value = "";
    projectForm.style.visibility = "hidden";
})

document.getElementById("cancelAddProjectBtn").addEventListener("click", () => {
    projectForm.style.visibility = "hidden";
})
