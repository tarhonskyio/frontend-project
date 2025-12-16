"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const ref = collection(db, "users", user.uid, "tasks");
      const snap = await getDocs(ref);

      const data = {};
      snap.forEach((d) => {
        data[d.id] = d.data().items || [];
      });

      setTasks(data);
    };

    load();
  }, [user]);

  const addTask = async (dateKey, text) => {
    const ref = doc(db, "users", user.uid, "tasks", dateKey);
    const items = tasks[dateKey] || [];

    await setDoc(ref, { items: [...items, text] });
    setTasks({ ...tasks, [dateKey]: [...items, text] });
  };

  const removeTask = async (dateKey, index) => {
    const items = [...tasks[dateKey]];
    items.splice(index, 1);

    const ref = doc(db, "users", user.uid, "tasks", dateKey);
    await setDoc(ref, { items });
    setTasks({ ...tasks, [dateKey]: items });
  };

  const editTask = async (dateKey, index, newText) => {
    const items = [...tasks[dateKey]];
    items[index] = newText;

    const ref = doc(db, "users", user.uid, "tasks", dateKey);
    await setDoc(ref, { items });
    setTasks({ ...tasks, [dateKey]: items });
  };

  return { tasks, addTask, removeTask, editTask };
}
