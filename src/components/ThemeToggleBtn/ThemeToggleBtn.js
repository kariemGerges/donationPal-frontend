import React, { useContext } from 'react';
import ThemeContext  from '../ThemeContext/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleBtn = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        // <div className="relative z-10 max-w-4xl mx-auto">
            // <div className="flex justify-between items-center mb-8">
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${theme ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'} transition-colors duration-300`}
                >
                    {theme ? <Sun size={24} /> : <Moon size={24} />}
                </button>
            // </div>
        // </div>
    );
};

export default ThemeToggleBtn;
