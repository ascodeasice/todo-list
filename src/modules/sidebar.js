//render sidebar components
import Project from "./Project";
import Task from "./Task";
import Cross from "../assets/cross.svg"
import { renderContent } from "./content";

const sidebar = document.getElementById("sidebar");

const renderSidebar = (projectList) => {
    sidebar.innerText = "";
    projectList.forEach(project => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("projectWrapper");
        wrapper.setAttribute("id", project.name);
        const projectText = document.createElement("p");
        projectText.innerText = project.name;

        const cross = document.createElement("img");
        cross.src = Cross;
        cross.classList.add("delProjectIcon");

        wrapper.appendChild(projectText);
        wrapper.appendChild(cross);
        sidebar.appendChild(wrapper);
    })
    renderContent(projectList[0]);
    addIconListener(projectList);
    addSidebarListener(projectList);
}

const addSidebarListener = (projectList) => {
    const projectWrappers = document.getElementsByClassName("projectWrapper");
    for (let i = 0; i < projectWrappers.length; i++) {
        projectWrappers[i].addEventListener("click", function () {
            for (let j = 0; j < projectWrappers.length; j++) {// remove chosenProject class from every project
                projectWrappers[j].classList.remove("chosenProject");
            }
            renderContent(projectList[i]);
            projectWrappers[i].classList.add("chosenProject");
        })
    }
}

const addIconListener = (projectList) => {
    const crossIcons = document.getElementsByClassName("delProjectIcon");
    for (let i = 0; i < crossIcons.length; i++) {
        crossIcons[i].addEventListener("click", () => {
            projectList.splice(i, 1);
            document.getElementById("content").innerText = "";
            renderSidebar(projectList);
        })
    }
}

export { renderSidebar, addSidebarListener, addIconListener };