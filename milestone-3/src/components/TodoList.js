import { getTodos } from '../utils/storage';
import { createTodoItem } from './TodoItem';

export const renderTodoList = () => {
  const container = document.getElementById('todo-list-container');
  if (!container) return;
  
  const todos = getTodos();

  if (todos.length === 0) {
    container.innerHTML = '';
    const emptyState = document.createElement('div');
    emptyState.className = 'py-16 flex flex-col items-center justify-center text-center animate-fade-in';
    emptyState.innerHTML = `
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <i class="ph ph-list-checks text-4xl text-slate-300"></i>
      </div>
      <h3 class="text-xl font-bold text-slate-800 mb-2">No tasks yet</h3>
      <p class="text-slate-400 max-w-[240px]">Plan your day by adding your first task above.</p>
    `;
    container.appendChild(emptyState);
    return;
  }

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  todos.forEach((todo) => {
    const item = createTodoItem(todo, renderTodoList);
    fragment.appendChild(item);
  });
  container.appendChild(fragment);
};
