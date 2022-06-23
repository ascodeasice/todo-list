//render sidebar components
import TrashCan from "../assets/trash-can.svg"
import Plus from "../assets/plus.svg"
import Edit from "../assets/edit.svg"
import CirclePlus from "../assets/circlePlus.svg"
import { renderContent } from "./content";

const sidebar = document.getElementById("sidebar");
const editProjectForm = document.getElementById("editProjectForm");
const editProjectTitleInput = document.getElementById("editProjectTitleInput");
const editProjectBtn = document.getElementById("editProjectBtn");
const cancelEditProjectBtn = document.getElementById("cancelEditProjectBtn");
let editProjectIndex = 0;//project that is editing

function addAddProjectListener() {
    const addProject = document.getElementById("addProjectContainer");
    const icon = document.getElementById("addProjectIcon");
    addProject.addEventListener("click", () => {
        const form = document.getElementById("addProjectForm");
        form.style.visibility = "visible";
    })

    addProject.addEventListener("mouseover", () => {
        icon.src = CirclePlus;
    })

    addProject.addEventListener("mouseout", () => {
        icon.src = Plus;
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

function addDeleteIconListener(projectList) {
    const deleteIcons = document.getElementsByClassName("delProjectIcon");
    for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].addEventListener("click", () => {
            projectList.splice(i, 1);
            document.getElementById("content").innerText = "";
            renderSidebar(projectList);
        })
    }
}

function addEditProjectIconListener(projects) {
    const icons = document.getElementsByClassName("editProjectIcon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", () => {
            editProjectIndex = i;
            editProjectForm.style.visibility = "visible";
            editProjectTitleInput.value = projects[i].title;
        })
    }

    editProjectBtn.addEventListener("click", () => {
        if (editProjectTitleInput.value == "")
            return;
        projects[editProjectIndex].title = editProjectTitleInput.value;
        renderSidebar(projects);
        editProjectForm.style.visibility = "hidden";
    })

    cancelEditProjectBtn.addEventListener("click", () => {
        editProjectForm.style.visibility = "hidden";
    })
}

function renderSidebar(projectList) {
    sidebar.innerText = "";
    //render projects
    projectList.forEach(project => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("projectWrapper");
        wrapper.setAttribute("id", project.title);

        const projectText = document.createElement("p");
        projectText.innerText = project.title;

        const deleteIcon = document.createElement("img");
        deleteIcon.src = TrashCan;
        deleteIcon.classList.add("delProjectIcon");

        const editIcon = document.createElement("img");
        editIcon.src = Edit;
        editIcon.classList.add("editProjectIcon");

        wrapper.appendChild(projectText);
        wrapper.appendChild(editIcon);
        wrapper.appendChild(deleteIcon);
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
    addIcon.setAttribute("id", "addProjectIcon");

    container.appendChild(addText);
    container.appendChild(addIcon);
    sidebar.appendChild(container);

    renderContent(projectList[0]);
    addDeleteIconListener(projectList);
    addSidebarListener(projectList);
    addAddProjectListener();
    addEditProjectIconListener(projectList);
}



export { renderSidebar };