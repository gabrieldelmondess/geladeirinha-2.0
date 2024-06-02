import React, { useState, useEffect } from "react";
import { supabase } from "../geli/lib/supabase";

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  completedBy?: string;
  createdAt: Date;
  completedAt?: Date;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*");

      if (error) {
        console.error("Error fetching todos:", error);
        return;
      }

      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodoTitle) return;

    const currentUser = supabase.auth.user?.id; // Get current user ID

    const { data, error } = await supabase.from("todos").insert({
      title: newTodoTitle,
      createdBy: currentUser,
      createdAt: new Date(),
    });

    if (error) {
      console.error("Error creating todo:", error);
      return;
    }

    setTodos([...todos, data[0]]); // Add new todo to list
    setNewTodoTitle(""); // Clear input
  };

  const handleToggleTodoCompletion = async (todo: TodoItem) => {
    const updatedTodo = {
      ...todo,
      completedBy: supabase.auth.user?.id, // Get current user ID
      completedAt: new Date(),
    };

    const { data, error } = await supabase
      .from("todos")
      .update(updatedTodo)
      .eq("id", todo.id);

    if (error) {
      console.error("Error updating todo:", error);
      return;
    }

    setTodos(todos.map((item) => (item.id === todo.id ? updatedTodo : item)));
  };

  return (
    <div>
      <h1>To-Do List</h1>

      <input
        type="text"
        placeholder="Add new task"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={!!todo.completedAt}
              onChange={() => handleToggleTodoCompletion(todo)}
            />
            {todo.title} - Created by: {todo.createdBy}, Completed by: {todo.completedBy || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;