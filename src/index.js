import Task from "./modules/Task.js";
import Project from "./modules/Project.js";
import { renderSidebar } from "./modules/sidebar.js";
import { renderContent } from "./modules/content.js";
import './style.css';
import { addProjectFormListeners, addTaskFormListeners } from "./modules/form.js";

let projects = [Project("Inbox", [Task("Example"), Task()]), Project("Coding", [Task()])];
renderSidebar(projects);
renderContent(projects[0]);
document.getElementById("Inbox").classList.add("chosenProject");//choose inbox by default
addProjectFormListeners();
addTaskFormListeners();
