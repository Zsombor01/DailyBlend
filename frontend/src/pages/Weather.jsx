import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import weatherBg from "./asset/weather.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Weather() {
    const [location, setCity] = useState("");
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");

    const containerStyle = {
        backgroundImage: `url(${weatherBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
    };

    const fetchWeatherData = async () => {
        if (!location.trim()) {
            toast.error("Please enter a location!");
            setCurrentWeather(null);
            setForecast(null);
            return;
        }

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                axios.get(`http://localhost:3333/weather/current?location=${location}`),
                axios.get(`http://localhost:3333/weather/forecast?location=${location}`),
            ]);

            setCurrentWeather(currentResponse.data);
            setForecast(forecastResponse.data);
            setError("");
        } catch (err) {
            if (err.status === 500) {
                toast.error("Invalid city name. Pleaase try again!");
            }
            setError(err.message);
            setCurrentWeather(null);
            setForecast(null);
        }
    };

    return (
        <div
            style={containerStyle}
            id="weatherContainer"
            className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-[6rem] font-bold text-red-600 dark:text-red-400">
                        Weather
                    </h1>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <Card className="pt-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md">
                        <CardContent>
                            <div className="flex gap-4">
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
}

export default Weather;
