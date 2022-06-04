import Task from "./modules/Task.js";
import Project from "./modules/Project.js";
import renderSidebar from "./modules/sidebar.js";
import './style.css';


renderSidebar();
let task = Task();
let task2 = Task("Testing")
let project1 = Project("Inbox", [task, task2]);
