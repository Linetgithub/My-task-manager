import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { addDoc, collection, db, doc, getDocs, updateDoc } from "./firebase.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPfsbW2u1rEbtMzTJX2Pfql7kkJHoMydY",
    authDomain: "my-task-manager-5d0e0.firebaseapp.com",
    projectId: "my-task-manager-5d0e0",
    storageBucket: "my-task-manager-5d0e0.firebasestorage.app",
    messagingSenderId: "777810899302",
    appId: "1:777810899302:web:629d26d003ab21e21cd8a7",
    measurementId: "G-VQP6DWJ966"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function addTask(taskText) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            text: taskText,
            completed: false,
            createdAt: new Date()
        });
        console.log("Task added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

export async function getTasks() {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

export async function deleteTask(taskId) {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        console.log("Task deleted:", taskId);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

export async function toggleTaskComplete(taskId, completed) {
    try {
        await updateDoc(doc(db, "tasks", taskId), { completed: !completed });
        console.log("Task updated:", taskId);
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

export { db };