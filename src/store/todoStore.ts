import { create } from 'zustand';
import { TodoStore } from '../types/todo';

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  searchQuery: '',

  addTodo: (title: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: new Date(),
        },
      ],
    })),

  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  updateTodo: (id: string, title: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      ),
    })),

  setSearchQuery: (query: string) =>
    set(() => ({
      searchQuery: query,
    })),
}));