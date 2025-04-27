import React from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main className="animate-slideIn">
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>TaskMaster © 2025 | Made with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;