import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
}

export const TodoItem = ({ todo, onCompletedChange }: TodoItemProps) => {
  return (
    <div>
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-700 bg-white hover:bg-slate-100">
        <input
          checked={todo.completed}
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          type="checkbox"
          className="scale-125"
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </label>
    </div>
  );
};
