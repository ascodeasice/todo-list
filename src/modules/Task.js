//class factory of the Task class

//priority should be 1(least important)~4(most important)
//due date stores date string
const Task = (title = "No name", description = "", dueDate = "", priority = 1, id = 'none', completed = false) => {
  return { title, description, dueDate, priority, id, completed };
}

export default Task;