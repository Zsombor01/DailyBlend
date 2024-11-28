import { useState, useEffect } from "react";
import { CalendarDays, Sun, Moon, Cloud, CloudRain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useTodo from "../hooks/useTodo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const { todos, addTodo, toggleTodo, deleteTodo, todoInput, setTodoInput } = useTodo();

    const [time, setTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
    const [greeting, setGreeting] = useState("");
    const [date, setDate] = useState("");
    const [weatherIcon, setWeatherIcon] = useState(<Sun />);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            setTime({ hours, minutes, seconds });

            const hour = now.getHours();
            if (hour < 12) setGreeting("Good Morning");
            else if (hour < 17) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");

            if (hour < 6) setWeatherIcon(<Moon className="h-8 w-8" />);
            else if (hour < 12) setWeatherIcon(<Sun className="h-8 w-8" />);
            else if (hour < 17) setWeatherIcon(<Cloud className="h-8 w-8" />);
            else setWeatherIcon(<CloudRain className="h-8 w-8" />);

            setDate(
                now.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            );
        };

        const timer = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-[6rem] font-bold text-blue-600 dark:text-blue-400">
                        DailyBlend
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your personal dashboard for the day
                    </p>
                </div>
                <div className="flex flex-col justify-center gap-8">
                    <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
                        <CardContent className="flex justify-center">
                            <div className="text-center">
                                <div className="font-mono text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                    {time.hours}:{time.minutes}
                                    <span className="text-3xl">:{time.seconds}</span>
                                </div>
                                <div className="text-3xl font-medium text-gray-600 dark:text-gray-300">
                                    {greeting}!
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
                        <CardContent>
                            <div className="flex items-center justify-center gap-4">
                                <CalendarDays className="h-8 w-8 text-blue-500" />
                                <div className="text-2xl font-medium text-gray-700 dark:text-gray-200">
                                    {date}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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
                                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
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
                                            <span
                                                className={`${
                                                    todo.done ? "line-through text-gray-500" : ""
                                                }`}
                                            >
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
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </div>
    );
};

export default Home;
