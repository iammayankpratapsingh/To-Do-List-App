import { useState, useEffect } from 'react';
import { Task } from '../types';
import { getTasks, saveTasks } from '../utils/localStorage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    setTasks(getTasks());
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (text: string, priority: Task['priority'] = 'medium', dueDate: string | null = null) => {
    if (text.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: Date.now(),
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Toggle task completion status
  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Edit a task
  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };
  
  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  };
};