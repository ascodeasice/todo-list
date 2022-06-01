//class factory of the Task class

const Task = (title = "No name", description = " ", dueDate = "None", priority = 0, completed = false, project = "Inbox") => {
    return { title, description, dueDate, priority, completed, project };
}

export default Task;