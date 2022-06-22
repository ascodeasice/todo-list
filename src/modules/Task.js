//class factory of the Task class

//priority should be 1(most important)~4(least important)
//due date stores date string
const Task = (title = "No name", description = " ", dueDate = "None", priority = 1, completed = false) => {
    return { title, description, dueDate, priority, completed };
}

export default Task;