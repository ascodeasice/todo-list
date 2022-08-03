import { addDoc, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getUserId, isUserSignedIn } from './auth';
import { db } from './item';

function deleteTodo() {

}

// save every todo items
async function saveTodo(project, task) {
  try {
    if (!collectionExist(project.title)) {
      ;
    }

    const docRef = await addDoc(collection(db, `${getUserId()}/${project.title}/tasks`), {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// delete projects in db
function deleteProject() {

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

async function collectionExist(collectionName) {
  return ((await getCollection(collectionName)).size > 0);
}


async function updateTasks() {
  if (isUserSignedIn()) {
    const collection = await getCollection(getUserId());
  }
}


export { saveTodo, saveProject, getCollection, collectionExist, updateTasks };