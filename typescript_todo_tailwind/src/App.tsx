import { useEffect, useState } from "react";
import { dummyData } from "./data/todos";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { TodoSummary } from "./components/TodoSummary";
import { Todo } from "./types/todo";

function App() {
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

  return (
    <main className="py-10 h-screen space-y-5 overflow-auto">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          onCompletedChange={setTodoCompleted}
          onDelete={deleteTodo}
        />
      </div>
      <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos} />
    </main>
  );
}

export default App;
