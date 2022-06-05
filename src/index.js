import Task from "./modules/Task.js";
import Project from "./modules/Project.js";
import { addSidebarListener, renderSidebar, addIconListener } from "./modules/sidebar.js";
import { renderContent } from "./modules/content.js";
import './style.css';

let projects = [Project("Inbox", [Task("Example"), Task()]), Project("Coding", [Task()])];
renderSidebar(projects);
renderContent(projects[0]);
document.getElementById("Inbox").classList.add("chosenProject");

//event listeners for cross icons on sidebar
//NOTE need to readd event listener when a new project is added
// const crossIcons = document.getElementsByClassName("delProjectIcon");
// for (let i = 0; i < crossIcons.length; i++) {
//     crossIcons[i].addEventListener("click", () => {
//         projects.splice(i, 1);
//         renderSidebar(projects);
//     })
// }

//TODO delete project from projects array