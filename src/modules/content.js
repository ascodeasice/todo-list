import Plus from "../assets/plus.svg"
import Circle from "../assets/circle.svg"

const contentDiv = document.getElementById("content")

function addCompleteIconListener(project) {
    const icons = document.getElementsByClassName("completeIcon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", function () {
            project.taskList.splice(i, 1);
            console.table(project.taskList);
            renderContent(project);
        })
    }
}

function renderContent(project) {
    if (!project)
        return;
    contentDiv.innerText = "";
    project.taskList.forEach(task => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("taskWrapper");

        const completeIcon = document.createElement("img");
        completeIcon.src = Circle;
        completeIcon.classList.add("completeIcon");

        const taskText = document.createElement("p");
        taskText.classList.add("taskText");
        taskText.innerText = String(project.taskList.indexOf(task) + 1) + ". " + task.title;

        wrapper.appendChild(completeIcon);
        wrapper.appendChild(taskText);
        contentDiv.appendChild(wrapper)
    })

    //render "add tasks"
    const container = document.createElement("div");
    container.setAttribute("id", "addTaskContainer");

    const addIcon = document.createElement("img");
    addIcon.src = Plus;

    const addText = document.createElement("p");
    addText.innerText = "Add task";

    container.appendChild(addIcon);
    container.appendChild(addText);
    contentDiv.appendChild(container);

    addCompleteIconListener(project);
}

export { renderContent };