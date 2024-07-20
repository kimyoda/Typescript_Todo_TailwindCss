import { useState } from "react";

interface AddTOdoFormProps {
  onSubmit: (title: string) => void;
}

export const AddTodoForm = ({ onSubmit }: AddTOdoFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="오늘 할일을 입력해주세요"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-700 text-white hover:bg-red-400"
      >
        Add
      </button>
    </form>
  );
};
