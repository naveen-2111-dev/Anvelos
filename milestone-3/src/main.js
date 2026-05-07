import './style.css';
import { renderTodoList } from './components/TodoList';
import { createModal } from './components/Modal';
import { addTodo } from './utils/storage';
import { showToast } from './components/Toast';

const updateDate = () => {
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
  }
};

const initApp = () => {
  updateDate();
  renderTodoList();

  const addBtn = document.getElementById('add-task-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      createModal({
        title: 'New Task',
        onSave: (text) => {
          addTodo(text);
          renderTodoList();
          showToast('Task added successfully');
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', initApp);
