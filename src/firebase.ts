import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

interface todosInterface{
    completed: boolean,
    createdAt: string,
    task: string,
    userId: string
}


const firebaseConfig = {
  apiKey: "AIzaSyDVnXrm4A8m5b2DgCsornJQXX4T-fItgd4",
  authDomain: "todos-96642.firebaseapp.com",
  projectId: "todos-96642",
  storageBucket: "todos-96642.firebasestorage.app",
  messagingSenderId: "1030314465269",
  appId: "1:1030314465269:web:a9cd6a3ed9fb566a0fb2bc",
  measurementId: "G-VCPYJTCS26"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const gitHubProvider = new GithubAuthProvider();
export const db = getFirestore(app);

export async function getTodos() {
  const user = auth.currentUser;
  const todosRef = collection(db, "todos");
  const q = query(todosRef, where("userId", "==", user?.uid));
  
  const querySnapshot = await getDocs(q);
  
  const todos = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as todosInterface
  }));
  
  return todos;
}
