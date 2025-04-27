import React, { useState } from 'react';
import { ListFilter } from 'lucide-react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'createdAt' | 'dueDate' | 'priority';

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('createdAt');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'createdAt') {
      return b.createdAt - a.createdAt;
    }
    
    if (sort === 'dueDate') {
      // If no due date, put at the end
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    if (sort === 'priority') {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    }
    
    return 0;
  });

  const getTaskCountText = () => {
    const activeCount = tasks.filter(task => !task.completed).length;
    return `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {getTaskCountText()}
          </h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <ListFilter size={20} />
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <option value="all">All Tasks</option>
                <option value="active">Active Tasks</option>
                <option value="completed">Completed Tasks</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <option value="createdAt">Latest Added</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 max-h-[500px] overflow-y-auto">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <p>No tasks found.</p>
            {filter !== 'all' && (
              <button 
                onClick={() => setFilter('all')} 
                className="mt-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Show all tasks
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;