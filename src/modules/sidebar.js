//render sidebar components
import Project from "./Project";
import Task from "./Task";

const sidebar = document.getElementById("sidebar");
let projects = [Project("Inbox", [Task("Example")]), Project("Coding", [])]

const renderSidebar = () => {
    projects.forEach(project => {
        const wrapper = document.createElement("div");
        const projectText = document.createElement("p");

        projectText.innerText = project.name;
        wrapper.appendChild(projectText);
        sidebar.appendChild(wrapper);
    })
}

export default renderSidebar;