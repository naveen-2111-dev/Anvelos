import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './utils/storage';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import Toast from './components/Toast';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setTodos(getTodos());
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddTodo = (text) => {
    const newTodo = addTodo(text);
    setTodos([newTodo, ...todos]);
    showToast('Task added successfully');
  };

  const handleUpdateTodo = (id, updates) => {
    const updated = updateTodo(id, updates);
    if (updated) {
      setTodos(todos.map(t => t.id === id ? updated : t));
      if (updates.completed !== undefined) {
        showToast(`Task ${updated.completed ? 'completed' : 'reactivated'}`);
      } else {
        showToast('Task updated successfully');
      }
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
    showToast('Task deleted', 'error');
  };

  const openAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Plus_Jakarta_Sans']">
      <header className="header-bar">
        <i className="ph-bold ph-caret-down text-lg"></i>
        <h1 className="text-lg font-bold tracking-tight">To-Do List</h1>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <section className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-1">Today</h2>
            <p className="text-slate-400 font-medium">{currentDate}</p>
          </div>
          <button onClick={openAddModal} className="btn-primary">
            <span>Add New Task</span>
            <i className="ph-bold ph-plus text-sm"></i>
          </button>
        </section>

        <TodoList 
          todos={todos} 
          onUpdate={handleUpdateTodo} 
          onDelete={handleDeleteTodo}
          onEdit={openEditModal}
        />
      </main>

      {isModalOpen && (
        <Modal 
          title={editingTodo ? 'Edit Task' : 'New Task'}
          value={editingTodo ? editingTodo.text : ''}
          onSave={(text) => {
            if (editingTodo) {
              handleUpdateTodo(editingTodo.id, { text });
            } else {
              handleAddTodo(text);
            }
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default App;
