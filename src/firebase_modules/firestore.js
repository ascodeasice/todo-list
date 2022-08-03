import { addDoc, collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getUserId, isUserSignedIn } from './auth';
import { db } from './item';
import Project from '../modules/Project';
import Task from '../modules/Task';
import { renderSidebar } from '../modules/sidebar';

function deleteTodo(project, task) {
  if (!isUserSignedIn()) {
    return;
  }
  deleteDoc(doc(db, `${getUserId()}/${project.title}/tasks/${task.id}`));
}

// save every todo items
async function saveTodo(project, task) {
  try {
    const docRef = await addDoc(collection(db, `${getUserId()}/${project.title}/tasks`), {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority
    });
    // save ID of task
    updateDoc(doc(db, `${getUserId()}/${project.title}/tasks/${docRef.id}`), {
      id: docRef.id
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// delete project in db
function deleteProject() {
  // NOTE delete all the docs in tasks subcollection before deleting project
}

// delete current projects to db
function saveProject(project) {
  if (isUserSignedIn()) {
    // add project with its title as ID
    setDoc(doc(db, `${getUserId()}/${project.title}`), {
      title: project.title
    });
  } else {
    throw new Error('Can\'t save project when user isn\'t signed in');
  }
}

async function getCollection(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot;
}

async function updateTasks(projects) {
  if (!isUserSignedIn()) {
    return;
  }

  const userCollection = await getCollection(getUserId());
  if (userCollection.size === 0) {
    // save all the projects 
    projects.forEach((project) => {
      saveProject(project);
      project.taskList.forEach((task) => {
        saveTodo(project, task);
      });
    });
  } else {
    // NOTE array is pass by reference, so this function changes "projects"
    while (projects.length > 0) {
      projects.pop();
    }

    // NOTE for each loop fires without waiting for await
    // use .docs to turn collection into array, to use map()
    for (let project of userCollection.docs) {
      const tasksCollection = await getCollection(`${getUserId()}/${project.data().title}/tasks`);
      const taskArr = tasksCollection.docs.map((task) => Task(task.data().title, task.data().description, task.data().dueDate, task.data().priority, task.data().id));
      projects.push(Project(project.data().title, taskArr)); // change the parameter array
    }
    renderSidebar(projects);
  }
}


export { saveTodo, saveProject, getCollection, updateTasks, deleteTodo };