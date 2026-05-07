import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete, onEdit }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  return (
    <div className={`todo-row ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}`}>
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => onUpdate(todo.id, { completed: !todo.completed })}
          className={`checkbox-circle ${todo.completed ? 'checked' : ''}`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <i className={`ph-bold ph-check text-[10px] transition-transform ${todo.completed ? 'scale-100' : 'scale-0'}`}></i>
        </button>
        <span className={`font-medium transition-all duration-300 ${
          todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
        }`}>
          {todo.text}
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={onEdit}
          className="icon-btn"
          aria-label="Edit task"
        >
          <i className="ph-bold ph-pencil-simple text-lg"></i>
        </button>
        <button 
          onClick={handleDelete}
          className="icon-btn-danger"
          aria-label="Delete task"
        >
          <i className="ph-bold ph-trash text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
