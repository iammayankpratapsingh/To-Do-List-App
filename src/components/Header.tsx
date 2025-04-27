import React from 'react';
import { CheckCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { ThemeType } from '../types';

interface HeaderProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 mb-6 rounded-lg flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-2">
        <CheckCircle size={24} className="text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskMaster</h1>
      </div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;