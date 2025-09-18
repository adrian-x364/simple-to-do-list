export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type CreateTodoData = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTodoData = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;
