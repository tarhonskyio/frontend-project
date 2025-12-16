import DayCell from "./DayCell";

export default function CalendarGrid({
  month,
  year,
  tasks,
  onAddTask,
  onRemoveTask,
  onEditTask,
}) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1;
        const dateKey = `${year}-${month + 1}-${day}`;

        return (
          <DayCell
            key={day}
            day={day}
            dateKey={dateKey}
            tasks={tasks[dateKey] || []}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
          />
        );
      })}
    </div>
  );
}
