import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import weatherBg from "./asset/weather.jpg";
import axios from "axios";

function Weather() {
  const [location, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  //Style object for the background
  const containerStyle = {
    backgroundImage: `url(${weatherBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    padding: '20px'
  };

  const fetchWeatherData = async () => {
    if (!location.trim()) {
      setError("Please, type in a city name!");
      setCurrentWeather(null);
      setForecast(null);
      return;
    }

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`http://localhost:3333/weather/current?location=${location}`),
        axios.get(`http://localhost:3333/weather/forecast?location=${location}`)
      ]);

      setCurrentWeather(currentResponse.data);
      setForecast(forecastResponse.data);
      setError("");
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    }
  };

  // Fetch todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3333/todos', {
          withCredentials: true
        });
        setTodos(response.data);
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (todoInput.trim()) {
      try {
        const response = await axios.post('http://localhost:3333/todos', 
          { text: todoInput },
          { withCredentials: true }
        );
        setTodos([...todos, response.data]);
        setTodoInput("");
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3333/todos/${id}`, 
        {},
        { withCredentials: true }
      );
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/todos/${id}`, {
        withCredentials: true
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div style={containerStyle} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[6rem] font-bold text-red-600 dark:text-red-400">
            Weather
          </h1>
        </div>

        <div className="flex flex-col justify-center gap-8">
          <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
            <CardContent>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50"
                  placeholder="Type in a city name..."
                  value={location}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={fetchWeatherData}
                >
                  Search
                </button>
              </div>
              {error && (
                <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>
              )}
            </CardContent>
          </Card>

          {currentWeather && (
            <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
              <CardContent>
                <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-4">
                  Current Weather in {currentWeather.name}
                </h3>
                <div className="grid gap-4">
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Temperature: {currentWeather.main.temp}°C
                  </p>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Status: {currentWeather.weather[0].description}
                  </p>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Wind: {currentWeather.wind.speed} m/s
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {forecast && (
            <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
              <CardContent>
                <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-4">
                  Forecast for {forecast.city.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {forecast.list.slice(0, 8).map((entry) => {
                    const date = new Date(entry.dt * 1000);
                    return (
                      <div
                        key={entry.dt}
                        className="p-4 bg-white/30 dark:bg-gray-700/30 rounded-lg"
                      >
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {date.toLocaleString()}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {entry.main.temp}°C
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {entry.weather[0].description}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {entry.wind.speed} m/s
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
            <CardContent>
              <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200 mb-4">
                To-Do List
              </h3>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50"
                  placeholder="New task..."
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={addTodo}
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex items-center justify-between p-2 bg-white/30 dark:bg-gray-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleTodo(todo._id)}
                        className="w-4 h-4"
                      />
                      <span className={`${todo.done ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Weather;
