import React, { useState } from 'react';
import { Edit, Trash2, Check, X, Save, Calendar } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      editTask(task.id, { 
        text: editText, 
        priority: editPriority,
        dueDate: editDueDate || null 
      });
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getFormattedDate = (dateString: string | null) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.getTime() === today.getTime()) {
      return 'Today';
    } else if (date.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(23, 59, 59, 999);
    const now = new Date();
    return dueDate < now && !task.completed;
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3 transition-all duration-300 transform hover:scale-[1.01] ${
        task.completed ? 'opacity-70' : ''
      }`}
    >
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            autoFocus
          />
          
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Task['priority'])}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>
          
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancelEdit}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
            >
              <X size={18} />
            </button>
            <button
              onClick={handleSaveEdit}
              className="p-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 transition-colors duration-300"
            >
              <Save size={18} />
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="flex items-start gap-3">
          <button
            onClick={() => toggleTask(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
              task.completed 
                ? 'bg-blue-500 border-blue-500 flex items-center justify-center text-white' 
                : 'border-gray-300 dark:border-gray-600'
            } transition-colors duration-300`}
          >
            {task.completed && <Check size={16} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className={`text-lg font-medium break-words ${
              task.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-800 dark:text-white'
            } transition-colors duration-300`}>
              {task.text}
            </p>
            
            <div className="flex flex-wrap items-center mt-2 gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              
              {task.dueDate && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isOverdue() 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  <Calendar size={12} className="mr-1" />
                  {getFormattedDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Edit task"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-300"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;