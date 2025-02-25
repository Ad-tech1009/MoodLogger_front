import { useState } from "react";
import PropTypes from "prop-types";

// Props validation
Calendar.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func.isRequired,
  logs: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired // Format: "YYYY-MM-DD"
  }))
};

export function Calendar({ 
  className,
  selected,
  onSelect,
  logs = [],  // Accept logs as prop
  ...props 
}) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());
  
  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    return { 
      firstDayOfWeek: firstDay.getDay(), 
      daysInMonth: lastDay.getDate(), 
      year, 
      month 
    };
  };
  
  const { firstDayOfWeek, daysInMonth, year, month } = getMonthData(currentMonth);
  
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  const handleDateSelect = (day) => {
    const newDate = new Date(year, month, day);
    onSelect(newDate);
  };

  // Check if a date has logs
  const hasLogs = (day) => {
    const formattedDate = new Date(year, month, day).toISOString().split("T")[0];
    return logs.some(log => log.date === formattedDate);
  };

  const renderCalendar = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<td key={`empty-${i}`} className="p-1"></td>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = isSameDay(date, new Date());
      const isSelected = selected && isSameDay(date, selected);
      const showDot = hasLogs(day); // Check if logs exist

      days.push(
        <td key={`day-${day}`} className="p-1 text-center">
          <button
            type="button"
            onClick={() => handleDateSelect(day)}
            className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${isSelected 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : isToday
                  ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                  : 'hover:bg-gray-100'
              }`}
          >
            {day}
            {showDot && (
              <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-red-500 rounded-full"></span>
            )}
          </button>
        </td>
      );
      
      if ((firstDayOfWeek + day) % 7 === 0 || day === daysInMonth) {
        if (day === daysInMonth && (firstDayOfWeek + day) % 7 !== 0) {
          const remainingCells = 7 - ((firstDayOfWeek + day) % 7);
          for (let i = 0; i < remainingCells; i++) {
            days.push(<td key={`empty-end-${i}`} className="p-1"></td>);
          }
        }
      }
    }
    
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(
        <tr key={`row-${i / 7}`}>
          {days.slice(i, i + 7)}
        </tr>
      );
    }
    
    return rows;
  };
  
  return (
    <div className={`${className || ''}`} {...props}>
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Previous month"
        >
          &#8592;
        </button>
        <h3 className="font-medium">
          {monthNames[month]} {year}
        </h3>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Next month"
        >
          &#8594;
        </button>
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {dayNames.map(day => (
              <th key={day} className="text-xs font-medium text-gray-500 p-1">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
    </div>
  );
}
