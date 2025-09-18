import type { Todo, CreateTodoData, UpdateTodoData } from '../types/todo';

// In-memory storage for demo purposes
// In production, this would be replaced with Vercel KV or a database
let todos: Todo[] = [
  {
    id: '1',
    title: 'Learn React Router v7',
    description: 'Go through the comprehensive guide and build a todo app',
    completed: false,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    priority: 'high'
  },
  {
    id: '2',
    title: 'Set up Vercel deployment',
    description: 'Configure the project for deployment on Vercel with KV storage',
    completed: false,
    createdAt: new Date('2024-01-15T11:00:00Z'),
    updatedAt: new Date('2024-01-15T11:00:00Z'),
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Add dark mode theme',
    description: 'Implement theme switching functionality',
    completed: true,
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-15T09:00:00Z'),
    priority: 'low'
  }
];

export function getAllTodos(): Todo[] {
  return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getTodoById(id: string): Todo | undefined {
  return todos.find(todo => todo.id === id);
}

export function createTodo(data: CreateTodoData): Todo {
  const newTodo: Todo = {
    id: generateId(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: string, data: UpdateTodoData): Todo | null {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return null;

  const updatedTodo = {
    ...todos[todoIndex],
    ...data,
    updatedAt: new Date()
  };
  todos[todoIndex] = updatedTodo;
  return updatedTodo;
}

export function deleteTodo(id: string): boolean {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return false;

  todos.splice(todoIndex, 1);
  return true;
}

export function toggleTodoComplete(id: string): Todo | null {
  const todo = getTodoById(id);
  if (!todo) return null;

  return updateTodo(id, { completed: !todo.completed });
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
