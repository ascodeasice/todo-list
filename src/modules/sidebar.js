//render sidebar components
import Cross from "../assets/cross.svg"
import Plus from "../assets/plus.svg"
import { renderContent } from "./content";

const sidebar = document.getElementById("sidebar");

function addAddProjectListener() {
    const addProject = document.getElementById("addProjectContainer");
    addProject.addEventListener("click", () => {
        const form = document.getElementById("addProjectForm");
        form.style.visibility = "visible";
    })
}

function addSidebarListener(projectList) {
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

function addIconListener(projectList) {
    const crossIcons = document.getElementsByClassName("delProjectIcon");
    for (let i = 0; i < crossIcons.length; i++) {
        crossIcons[i].addEventListener("click", () => {
            projectList.splice(i, 1);
            document.getElementById("content").innerText = "";
            renderSidebar(projectList);
        })
    }
}

function renderSidebar(projectList) {
    sidebar.innerText = "";
    //render projects
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
    }
    )
    //render "add projects"
    const container = document.createElement("div");
    container.setAttribute("id", "addProjectContainer");

    const addText = document.createElement("p");
    addText.innerText = "Add project";

    const addIcon = document.createElement("img");
    addIcon.src = Plus;

    container.appendChild(addText);
    container.appendChild(addIcon);
    sidebar.appendChild(container);

    renderContent(projectList[0]);
    addIconListener(projectList);
    addSidebarListener(projectList);
    addAddProjectListener();
}



export { renderSidebar };