"use client";

import { useState } from "react";

export default function DayCell({
  day,
  dateKey,
  tasks,
  onAddTask,
  onRemoveTask,
  onEditTask,
}) {
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const taskCount = tasks.length;

  return (
    <div className="border rounded p-2 bg-white shadow-sm relative">
      {/* HEADER DNIA */}
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold">{day}</span>

        {taskCount > 0 && (
          <span className="text-xs bg-blue-600 text-white rounded-full px-2">
            {taskCount}
          </span>
        )}
      </div>

      {/* LISTA ZADAŃ */}
      <ul className="text-sm mb-2">
        {tasks.map((task, i) => (
          <li key={i} className="mb-1">
            {editIndex === i ? (
              <div className="flex gap-1">
                <input
                  className="border px-1 flex-1"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="text-green-600"
                  onClick={() => {
                    onEditTask(dateKey, i, editText);
                    setEditIndex(null);
                  }}
                >
                  ✔
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setEditIndex(i);
                    setEditText(task);
                  }}
                >
                  {task}
                </span>
                <button
                  className="text-red-600"
                  onClick={() => onRemoveTask(dateKey, i)}
                >
                  ✕
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* DODAWANIE ZADANIA */}
      <div className="flex gap-1">
        <input
          className="border rounded px-1 text-sm w-full"
          placeholder="Nowe zadanie"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-2 rounded"
          onClick={() => {
            if (newTask.trim()) {
              onAddTask(dateKey, newTask);
              setNewTask("");
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
