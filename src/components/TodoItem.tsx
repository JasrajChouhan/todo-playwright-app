import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleUpdate = () => {
    if (editedTitle.trim() !== '') {
      onUpdate(id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
        data-testid="todo-checkbox"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            data-testid="edit-todo-input"
          />
          <button
            onClick={handleUpdate}
            className="p-1 text-green-500 hover:text-green-600"
            data-testid="save-todo-button"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 text-red-500 hover:text-red-600"
            data-testid="cancel-edit-button"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            {title}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            data-testid="edit-todo-button"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 text-red-500 hover:text-red-600"
            data-testid="delete-todo-button"
          >
            <Trash2 size={20} />
          </button>
        </>
      )}
    </div>
  );
};