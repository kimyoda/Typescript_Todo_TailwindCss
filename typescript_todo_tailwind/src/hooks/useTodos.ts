import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { dummyData } from "../data/todos";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const saveTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    return saveTodos.length > 0 ? saveTodos : dummyData;
  });

  // localStorage 로 저장하기
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const setTodoCompleted = (id: number, completed: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const addTodo = (title: string) => {
    setTodos((prevTodos) => [
      {
        // Date.now 도 왜 괜찮은 지 확인해보기
        id: Date.now(),
        title,
        completed: false,
      },
      ...prevTodos,
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const deleteAllCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return {
    todos,
    setTodoCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompletedTodos,
  };
};

export default useTodos;
