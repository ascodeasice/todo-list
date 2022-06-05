import Task from "./Task";
import Project from "./Project";

const contentDiv = document.getElementById("content")

function renderContent(project) {
    if (!project)
        return;
    contentDiv.innerText = "";
    project.taskList.forEach(task => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("taskWrapper");

        const taskText = document.createElement("p");
        taskText.classList.add("taskText");
        taskText.innerText = String(project.taskList.indexOf(task) + 1) + ". " + task.title;

        wrapper.appendChild(taskText);
        contentDiv.appendChild(wrapper)
    })
}

export { renderContent };