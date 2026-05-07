import { updateTodo, deleteTodo } from '../utils/storage';
import { createModal } from './Modal';
import { showToast } from './Toast';

export const createTodoItem = (todo, onUpdate) => {
  const item = document.createElement('div');
  item.className = 'todo-row animate-slide-in';
  item.dataset.id = todo.id;

  // Checkbox Container
  const leftSection = document.createElement('div');
  leftSection.className = 'flex items-center gap-4 flex-1';

  const checkbox = document.createElement('button');
  checkbox.className = `checkbox-circle ${todo.completed ? 'checked' : ''}`;
  checkbox.setAttribute('aria-label', todo.completed ? 'Mark as incomplete' : 'Mark as complete');
  
  const checkIcon = document.createElement('i');
  checkIcon.className = `ph-bold ph-check text-[10px] transition-transform ${todo.completed ? 'scale-100' : 'scale-0'}`;
  checkbox.appendChild(checkIcon);

  const text = document.createElement('span');
  text.className = `font-medium transition-all duration-300 ${
    todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
  }`;
  text.textContent = todo.text;

  leftSection.appendChild(checkbox);
  leftSection.appendChild(text);

  // Actions Container
  const rightSection = document.createElement('div');
  rightSection.className = 'flex items-center gap-1';

  const editBtn = document.createElement('button');
  editBtn.className = 'icon-btn';
  editBtn.innerHTML = '<i class="ph-bold ph-pencil-simple text-lg"></i>';
  editBtn.setAttribute('aria-label', 'Edit task');

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'icon-btn-danger';
  deleteBtn.innerHTML = '<i class="ph-bold ph-trash text-lg"></i>';
  deleteBtn.setAttribute('aria-label', 'Delete task');

  rightSection.appendChild(editBtn);
  rightSection.appendChild(deleteBtn);

  item.appendChild(leftSection);
  item.appendChild(rightSection);

  // Event Listeners
  checkbox.addEventListener('click', () => {
    const updated = updateTodo(todo.id, { completed: !todo.completed });
    onUpdate();
    showToast(`Task ${updated.completed ? 'completed' : 'reactivated'}`);
  });

  editBtn.addEventListener('click', () => {
    createModal({
      title: 'Edit Task',
      value: todo.text,
      onSave: (newText) => {
        updateTodo(todo.id, { text: newText });
        onUpdate();
        showToast('Task updated successfully');
      }
    });
  });

  deleteBtn.addEventListener('click', () => {
    item.classList.add('animate-slide-out');
    item.addEventListener('animationend', () => {
      deleteTodo(todo.id);
      onUpdate();
      showToast('Task deleted', 'error');
    }, { once: true });
  });

  return item;
};
