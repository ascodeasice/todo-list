const Project = (title, taskList) => {
    const complete = (index) => {
        if (index < 0 || index >= taskList.length) {
            console.log("Out of index in taskList")
            return;
        }
        taskList[index].copmleted = true;
        taskList.splice(index, 1);// remove the task
    }

    const addTask = (task) => {
        taskList.push(task);
    }

    return { title, taskList, complete, addTask }
}

export default Project;