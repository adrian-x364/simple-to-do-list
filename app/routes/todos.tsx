import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/todos";
import type { Todo } from "../types/todo";
import { getAllTodos, createTodo, updateTodo, deleteTodo, toggleTodoComplete } from "../utils/todoStorage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todos - Simple Todo" },
    { name: "description", content: "Manage your daily tasks" }
  ];
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setTodos(getAllTodos());
  }, []);

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const newTodo = createTodo({
      title: newTodoTitle.trim(),
      description: newTodoDescription.trim() || undefined,
      priority: newTodoPriority,
      completed: false
    });

    setTodos(getAllTodos());
    setNewTodoTitle("");
    setNewTodoDescription("");
    setNewTodoPriority('medium');
    setIsCreating(false);
  };

  const handleToggleComplete = (id: string) => {
    toggleTodoComplete(id);
    setTodos(getAllTodos());
  };

  const handleDeleteTodo = (id: string) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(id);
      setTodos(getAllTodos());
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Add Todo
        </button>
      </div>

      {/* Create Todo Form */}
      {isCreating && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
          <form onSubmit={handleCreateTodo} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter todo title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter todo description (optional)"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Create Todo
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === 'active'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>

      {/* Todos List */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
            </h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'Create your first todo to get started!'
                : `You don't have any ${filter} todos.`
              }
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all ${
                todo.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleComplete(todo.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {todo.completed && <span className="text-xs">✓</span>}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-medium ${
                        todo.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-900'
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(
                        todo.priority
                      )}`}
                    >
                      {todo.priority}
                    </span>
                  </div>

                  {todo.description && (
                    <p
                      className={`text-sm ${
                        todo.completed ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}

                  <div className="text-xs text-gray-400 mt-2">
                    Created: {new Date(todo.createdAt).toLocaleDateString()}
                    {todo.updatedAt !== todo.createdAt && (
                      <span> • Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Delete todo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
