import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.jsx";
import { Button } from "./components/ui/button.jsx";
import { Calendar } from "./components/ui/calendar.jsx";
import { Form, FormGroup, FormLabel, FormSelect, FormTextarea } from "./components/ui/form.jsx";
import TopNav from "./components/header.jsx";
import { Trash2 } from "lucide-react";
import { ThemeProvider } from "./contexts/theme.js";
import { useEffect } from "react"; //Import use effect

export default function MoodLogger() {
  const [formData, setFormData] = useState({
    mood: "happy", // Default to happy mood
    intensity: "3", // Default to medium intensity
    notes: "",
  });
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState("list");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Predefined mood options
  const moodOptions = [
    { value: "happy", label: "Happy" },
    { value: "calm", label: "Calm" },
    { value: "energetic", label: "Energetic" },
    { value: "tired", label: "Tired" },
    { value: "anxious", label: "Anxious" },
    { value: "sad", label: "Sad" },
  ];

  // Intensity options
  const intensityOptions = [
    { value: "1", label: "Very Low" },
    { value: "2", label: "Low" },
    { value: "3", label: "Medium" },
    { value: "4", label: "High" },
    { value: "5", label: "Very High" },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to delete a log
  const handleDelete = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.mood.trim()) {
      const now = new Date(); // Current timestamp
      const logDate = selectedDate
        ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) // Preserve local date
        : new Date();
      
      const formattedDate = logDate.toISOString().split("T")[0]; // YYYY-MM-DD format (ensuring consistency)
  
      const newLog = {
        date: formattedDate,  // Store as YYYY-MM-DD (to group logs by day)
        timestamp: now, // Store current time (to keep it unique)
        mood: formData.mood,
        intensity: formData.intensity,
        notes: formData.notes,
        id: Date.now(), // Unique identifier
      };
  
      // Update logs: Add new log while preserving existing ones
      setLogs((prevLogs) => [...prevLogs, newLog]);
  
      // Reset form fields
      setFormData({
        mood: "happy",
        intensity: "3",
        notes: "",
      });
    }
  };
  

  // Get color based on mood
  const getMoodStyle = (mood) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "bg-green-100 text-green-800";
      case "calm":
        return "bg-blue-100 text-blue-800";
      case "energetic":
        return "bg-yellow-100 text-yellow-800";
      case "tired":
        return "bg-purple-100 text-purple-800";
      case "anxious":
        return "bg-orange-100 text-orange-800";
      case "sad":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter logs based on selected date
  const filteredLogs = selectedDate 
  ? logs.filter(log => log.date === selectedDate.toISOString().split("T")[0])
  : logs;

  //  Theme mode function
  const [themeMode,setThemeMode]=useState("light");
  const lightTheme=()=>{
    setThemeMode("light")
  }
  const darkTheme=()=>{
    setThemeMode("dark")
  }

  // actual theme change
  useEffect(() => {
   document.querySelector('html').classList.remove("light","dark")
   document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  

  return (
    <ThemeProvider  value={{themeMode , lightTheme , darkTheme}}>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50   dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <TopNav />

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left Section - Calendar & Stats */}
          <div className="md:col-span-1 space-y-6">
            {/* Calendar Card */}
            <Card className="shadow-lg border border-indigo-200 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-indigo-200 rounded-t-xl px-6 py-4">
                <CardTitle className="text-indigo-900 font-semibold text-lg">Calendar View</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex justify-center">
                <Calendar 
                  logs={logs}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg p-3 bg-white"
                />
              </CardContent>
            </Card>
            {/* Stats Card */}
            <Card className="shadow-lg border border-indigo-200 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-indigo-200 rounded-t-xl px-6 py-4">
                <CardTitle className="text-indigo-900 font-semibold text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 text-md">Total Entries:</p>
                  <p className="text-xl font-semibold text-indigo-700">{logs.length}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 text-md">This Month:</p>
                  <p className="text-xl font-semibold text-purple-700">
                    {logs.filter(log => new Date(log.date).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center/Right Sections - Mood Logging & History */}
          <div className="md:col-span-2 space-y-6">
            {/* Mood Logging Card */}
            <Card className="shadow-lg border border-indigo-200 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl px-6 py-4">
                <CardTitle className="text-lg font-semibold">How are you feeling today?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup>
                      <FormLabel htmlFor="mood" className="font-medium">Mood</FormLabel>
                      <FormSelect
                        id="mood"
                        name="mood"
                        value={formData.mood}
                        onChange={handleChange}
                        options={moodOptions}
                        required
                        className="rounded-md border-gray-300 focus:ring-indigo-500"
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="intensity" className="font-medium">Intensity</FormLabel>
                      <FormSelect
                        id="intensity"
                        name="intensity"
                        value={formData.intensity}
                        onChange={handleChange}
                        options={intensityOptions}
                        className="rounded-md border-gray-300 focus:ring-indigo-500"
                      />
                    </FormGroup>
                  </div>
                  <FormGroup>
                    <FormLabel htmlFor="notes" className="font-medium">Notes (optional)</FormLabel>
                    <FormTextarea
                      id="notes"
                      name="notes"
                      placeholder="Add any additional thoughts or context..."
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="rounded-md border-gray-300 focus:ring-indigo-500"
                    />
                  </FormGroup>
                  <Button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-all"
                  >
                    Log Mood
                  </Button>
                </Form>
              </CardContent>
            </Card>
            {/* Mood History Card */}
            <Card className="shadow-lg border border-indigo-200 rounded-xl">
              <CardHeader className="bg-indigo-50 border-b border-indigo-200 flex flex-row justify-between items-center px-6 py-4 rounded-t-xl">
                <CardTitle className="text-indigo-800 font-semibold text-lg">
                  {selectedDate ? `Entries for ${selectedDate.toLocaleDateString("en-GB")}` : "Recent Entries"}
                </CardTitle>
                <div className="flex space-x-2 rounded-md overflow-hidden border border-indigo-300">
                  <button
                    onClick={() => setView("list")}
                    className={`px-4 py-2 text-sm transition-all ${
                      view === "list" 
                        ? "bg-indigo-500 text-white" 
                        : "bg-white text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    className={`px-4 py-2 text-sm transition-all ${
                      view === "grid" 
                        ? "bg-indigo-500 text-white" 
                        : "bg-white text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    Grid
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {filteredLogs.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">
                    <p>No moods logged {selectedDate ? "for this date" : "yet"}.</p>
                    <p className="text-sm mt-1">Share how you feel to get started!</p>
                  </div>
                ) : (
                  <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                    {filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`relative p-5 rounded-lg shadow-sm border border-gray-200 ${getMoodStyle(log.mood)} bg-opacity-90 transition-all hover:shadow-md`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600">
                              {new Date(log.timestamp).toLocaleString("en-GB", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                                day: "2-digit",
                                month: "short",
                              })}
                            </p>
                            <p className="text-lg font-semibold text-indigo-800 mt-1">{log.mood}</p>
                          </div>
                          <div className="px-3 py-1 rounded bg-white bg-opacity-75 text-xs font-medium text-gray-700">
                            Intensity: {log.intensity}/5
                          </div>
                        </div>

                        {log.notes && (
                          <div className="mt-3 pt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-700">{log.notes}</p>
                          </div>
                        )}

                        {/* 🗑 Trash Icon Button (Delete Log) */}
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="absolute bottom-3 right-3 text-red-500 hover:text-red-700 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
      </main>
    </div>
    </ThemeProvider>
  );
}