const STORAGE_KEY = 'circle_soft_todos';

export const getTodos = () => {
  try {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error fetching todos from storage:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to storage:', error);
  }
};

export const addTodo = (text) => {
  const todos = getTodos();
  const newTodo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.unshift(newTodo);
  saveTodos(todos);
  return newTodo;
};

export const updateTodo = (id, updates) => {
  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates };
    saveTodos(todos);
    return todos[index];
  }
  return null;
};

export const deleteTodo = (id) => {
  const todos = getTodos();
  const filtered = todos.filter((t) => t.id !== id);
  saveTodos(filtered);
};
