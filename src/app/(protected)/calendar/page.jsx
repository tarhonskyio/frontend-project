"use client";

import { useState } from "react";
import MonthYearSelector from "../../components/calendar/MonthYearSelector";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import { useTasks } from "../../components/useTasks";

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const { tasks, addTask, removeTask, editTask } = useTasks();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kalendarz</h1>

      <MonthYearSelector
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />

      <CalendarGrid
        month={month}
        year={year}
        tasks={tasks}
        onAddTask={addTask}
        onRemoveTask={removeTask}
        onEditTask={editTask}
      />
    </div>
  );
}
