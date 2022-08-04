//control the task content on the right side
import Plus from "../assets/plus.svg"
import Circle from "../assets/circle.svg"
import TrashCan from "../assets/trash-can.svg"
import Edit from "../assets/edit.svg"
import Task from "./Task.js"
import CirclePlus from "../assets/circlePlus.svg"
import { format, parse, formatDistanceToNow } from "date-fns"
import { isUserSignedIn } from "../firebase_modules/auth"
import { deleteTodo, editTask } from "../firebase_modules/firestore"

const contentDiv = document.getElementById("content");
const editTaskForm = document.getElementById("editTaskForm");
const editTaskBtn = document.getElementById("editTaskBtn");
const cancelEditTaskBtn = document.getElementById("cancelEditTaskBtn");
const editTaskTitleInput = document.getElementById("editTaskTitleInput");
const editTaskPriorityInput = document.getElementById("editTaskPriorityInput");
const editTaskDesInput = document.getElementById("editTaskDesInput");
const editTaskDateInput = document.getElementById("editTaskDateInput");

let chosenTaskIndex = 0;//the index of task needed to be edited

//show the add task form
function addAddTaskListener() {
  const addTask = document.getElementById("addTaskContainer");

  const icon = document.getElementById("addTaskIcon");
  addTask.addEventListener("mouseover", () => {
    icon.src = CirclePlus;
  })

  addTask.addEventListener("mouseout", () => {
    icon.src = Plus;
  })

  addTask.addEventListener("click", () => {
    const form = document.getElementById("addTaskForm");
    form.style.visibility = "visible";
  })
}

function addCompleteIconListener(project) {
  const icons = document.getElementsByClassName("completeIcon");
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", function () {
      if (isUserSignedIn()) {
        deleteTodo(project, project.taskList[i]);
      }
      project.taskList.splice(i, 1);
      renderContent(project);
    });
  }
}

function addDeleteIconListener(project) {
  const icons = document.getElementsByClassName("delTaskIcon");
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", () => {
      if (isUserSignedIn()) {
        deleteTodo(project, project.taskList[i]);
      }
      project.taskList.splice(i, 1);
      renderContent(project);
    })
  }
}

function addEditTaskIconListener(project) {
  const icons = document.getElementsByClassName("editTaskIcon");
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", () => {
      chosenTaskIndex = i;
      editTaskForm.style.visibility = "visible";
      let task = project.taskList[chosenTaskIndex];

      editTaskTitleInput.value = task.title;
      editTaskPriorityInput.value = task.priority;
      editTaskDesInput.value = task.description;
      editTaskDateInput.value = task.dueDate;
    })

    editTaskBtn.addEventListener("click", () => {
      if (editTaskTitleInput.value == "" || editTaskPriorityInput.value == "" || Number(taskPriorityInput.value) < 1 || Number(taskPriorityInput.value) > 4)
        return;
      const oldTask = project.taskList[chosenTaskIndex];
      const newTask = Task(editTaskTitleInput.value, editTaskDesInput.value, editTaskDateInput.value,
        editTaskPriorityInput.value, oldTask.id);

      if (isUserSignedIn()) {
        editTask(project, newTask);
      }
      project.taskList[chosenTaskIndex] = newTask;
      renderContent(project);
      editTaskForm.style.visibility = "hidden";
    });

    cancelEditTaskBtn.addEventListener("click", () => {
      editTaskForm.style.visibility = "hidden";
    })
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function renderContent(project) {
  if (!project) {
    return;
  }
  contentDiv.innerText = "";
  // sort by priority
  project.taskList.sort((a, b) => b.priority - a.priority);
  project.taskList.forEach(task => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("taskWrapper");

    const completeIcon = document.createElement("img");
    completeIcon.src = Circle;
    completeIcon.classList.add("completeIcon");
    completeIcon.classList.add("icon");
    completeIcon.classList.add("priority" + String(task.priority) + "Icon");

    const taskText = document.createElement("p");
    taskText.classList.add("taskText");
    taskText.innerText = task.title;

    const taskDes = document.createElement("p");
    taskDes.classList.add("taskInfo");
    taskDes.classList.add("taskDes");//for position in grid
    taskDes.innerText = task.description;

    const taskDate = document.createElement("p");
    const dueDate = parse(task.dueDate, 'yyyy-MM-dd', new Date());
    if (isValidDate(dueDate)) {
      taskDate.innerText = format(dueDate, 'yyyy/LL/dd(E)') + ", " + formatDistanceToNow(dueDate, { addSuffix: true })
    } else {
      taskDate.innerText = "";
    }
    taskDate.classList.add("taskInfo");
    taskDate.classList.add("taskDate");//for position in grid

    const editIcon = document.createElement("img");
    editIcon.src = Edit;
    editIcon.classList.add("editTaskIcon");
    editIcon.classList.add("icon");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = TrashCan;
    deleteIcon.classList.add("delTaskIcon");
    deleteIcon.classList.add("icon");

    wrapper.appendChild(completeIcon);
    wrapper.appendChild(taskText);
    wrapper.appendChild(taskDes);
    wrapper.appendChild(taskDate);
    wrapper.appendChild(editIcon);
    wrapper.appendChild(deleteIcon);
    contentDiv.appendChild(wrapper);
  })

  //render "add tasks"
  const container = document.createElement("div");
  container.setAttribute("id", "addTaskContainer");

  const addIcon = document.createElement("img");
  addIcon.src = Plus;
  addIcon.setAttribute("id", "addTaskIcon");

  const addText = document.createElement("p");
  addText.innerText = "Add task";

  container.appendChild(addIcon);
  container.appendChild(addText);
  contentDiv.appendChild(container);

  addCompleteIconListener(project);
  addDeleteIconListener(project);
  addEditTaskIconListener(project);
  addAddTaskListener();
}

export { renderContent };