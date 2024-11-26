import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  todoText: string
  isCompleted: boolean;
  id: string;
}

export const TodoInput = () => {

  const [todos, setTodos] = useState < Todo[]> ([]);
  const [todoText, setTodoText] = useState("")


  const postTodoOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoText.trim()) {
      alert("Todo text can't be empty.");
      return ;
    }
    
    setTodoText(todoText);

    const newTodo = {
      todoText: todoText,
      isCompleted: false,
      id: uuidv4()
    }
    
    setTodos((prevTodos : Todo[]) => {
      const updatedTodos = [...prevTodos , newTodo];
      localStorage.setItem("todos", JSON.stringify(todos))
      return updatedTodos;
    })

    setTodoText("");
    console.log(todoText);
  }
  return <div>

    <form onSubmit={postTodoOnSubmit}>

      {/** input  */}
      <input
        id="todo-input"
        name="todo-input"
        value={todoText}
        placeholder="Enter todo"
        onChange={(e) => setTodoText(e.target.value)}
      />

      {/** submit button */}
      <button type="submit">Add</button>
    </form>
  </div>
}