import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <i className="ph ph-list-checks text-4xl text-slate-300"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No tasks yet</h3>
        <p className="text-slate-400 max-w-[240px]">Plan your day by adding your first task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onUpdate={onUpdate} 
          onDelete={onDelete}
          onEdit={() => onEdit(todo)}
        />
      ))}
    </div>
  );
};

export default TodoList;
