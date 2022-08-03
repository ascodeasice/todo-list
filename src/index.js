import Task from "./modules/Task.js";
import Project from "./modules/Project.js";
import { renderSidebar } from "./modules/sidebar.js";
import { renderContent } from "./modules/content.js";
import { addProjectFormListeners, addAddTaskFormListeners } from "./modules/form.js";
import { signIn, signOutUser, updateProfile } from "./firebase_modules/auth";
import { updateTasks } from './firebase_modules/firestore';
import './style.css';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');


signInBtn.addEventListener('click', signIn);
signOutBtn.addEventListener('click', signOutUser);

updateProfile();
onAuthStateChanged(getAuth(), updateProfile);

let exampleTasks = [];
for (let i = 1; i <= 4; i++) {
  exampleTasks.push(Task("Priority " + String(i), "", "", i));
}
exampleTasks.push(Task("With description", "Hi there", "", 1));
exampleTasks.push(Task("With due date", "", "2022-01-01", 1));
exampleTasks.push(Task("With both", "Trying to get into CS", "2022-06-23", 1));

let projects = [Project("Example", exampleTasks), Project("Inbox", [Task("Something productive")])];
renderSidebar(projects);
renderContent(projects[0]);
document.getElementById("Example").classList.add("chosenProject");//choose inbox by default
addProjectFormListeners(projects);
addAddTaskFormListeners(projects);

onAuthStateChanged(getAuth(), () => updateTasks(projects));
