//control the task content on the right side
import Plus from "../assets/plus.svg"
import Circle from "../assets/circle.svg"

const contentDiv = document.getElementById("content")

const addAddTaskListener = () => {
    const addTask = document.getElementById("addTaskContainer");
    addTask.addEventListener("click", () => {
        const form = document.getElementById("addTaskForm");
        form.style.visibility = "visible";
    })
}

function addCompleteIconListener(project) {
    const icons = document.getElementsByClassName("completeIcon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", function () {
            project.taskList.splice(i, 1);
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
        completeIcon.classList.add("priority" + String(task.priority) + "Icon");

        const taskText = document.createElement("p");
        taskText.classList.add("taskText");
        taskText.innerText = String(project.taskList.indexOf(task) + 1) + ". " + task.title;

        const taskDes = document.createElement("p");//TODO change task title to heading
        taskDes.classList.add("taskInfo");
        taskDes.classList.add("taskDes");//for position in grid
        taskDes.innerText = task.description;

        const taskDate = document.createElement("p");
        taskDate.classList.add("taskInfo");
        taskDate.classList.add("taskDate");//for position in grid
        taskDate.innerText = task.dueDate;//NOTE might chnage the format

        wrapper.appendChild(completeIcon);
        wrapper.appendChild(taskText);
        wrapper.appendChild(taskDes);
        wrapper.appendChild(taskDate);
        contentDiv.appendChild(wrapper);
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
    addAddTaskListener();
}

export { renderContent };