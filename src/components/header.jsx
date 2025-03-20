import { useState } from "react";
import { Moon, Sun, User } from "lucide-react"; // Import icons
import useTheme from "../contexts/theme";
const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
 const {themeMode, lightTheme, darkTheme}=useTheme(); 



  return (
    
    <header className="bg-white shadow-md border-b border-gray-200 relative dark:bg-gray-900 dark:border-gray-700 dark:shadow-lg">
      
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* App Title */}
        <h1 className="text-2xl font-bold text-indigo-800">
          Mood Logger
        </h1>
        {/* Right Section - Dark Mode & Profile */}
        <div className="flex items-center gap-5">
          {/* Dark Mode Toggle (Dummy) */}
          <button
            onClick={() => {themeMode === "dark" ? lightTheme() : darkTheme();}}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            {themeMode === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
          {/* Profile Section */}
          <div className="relative">
            {/* Profile Icon */}
            <div
              className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 transition duration-300 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <User className="w-5 h-5 text-white" />
            </div>
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-300">
                <ul className="py-2">
                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">⚙️ Settings</li>
                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">ℹ️ About</li>
                  <li className="px-4 py-3 hover:bg-red-100 text-red-600 cursor-pointer transition">🚪 Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default TopNav;
