import { SearchBar } from './components/SearchBar';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { useTodoStore } from './store/todoStore';

function App() {
  const {
    todos,
    searchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setSearchQuery,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Todo App
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <TodoInput onAdd={addTodo} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))}
            </div>

            {filteredTodos.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                {searchQuery ? 'No matching todos found' : 'No todos yet'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;