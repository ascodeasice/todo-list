import Task from "./modules/Task.js";
import Project from "./modules/Project.js";
let task = Task();
let task2 = Task("Testing")
let project1 = Project("Inbox", [task, task2]);
// for (let i = 0; i < 3; i++) {
//     project1.taskList.forEach(task => console.table(task))
//     project1.complete(i)
// }