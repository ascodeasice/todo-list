import Task from "./Task";

const Project = (name, taskList) => {
    const complete = (index) => {
        if (index < 0 || index >= taskList.length) {
            console.log("Out of index in taskList")
            return;
        }
        taskList[index].copmleted = true;
        taskList.splice(index, 1);// remove the task
    }
    return { name, taskList, complete }
}

export default Project;