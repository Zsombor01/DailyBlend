import { useState, useEffect } from "react";
import { CalendarDays, Sun, Moon, Cloud, CloudRain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    period: "AM"
  });
  
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(<Sun />);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      
      setTime({
        hours: String(hours).padStart(2, "0"),
        minutes: String(now.getMinutes()).padStart(2, "0"),
        seconds: String(now.getSeconds()).padStart(2, "0"),
        period
      });

      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");

      if (hour < 6) setWeatherIcon(<Moon className="h-8 w-8" />);
      else if (hour < 12) setWeatherIcon(<Sun className="h-8 w-8" />);
      else if (hour < 17) setWeatherIcon(<Cloud className="h-8 w-8" />);
      else setWeatherIcon(<CloudRain className="h-8 w-8" />);

      setDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
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
                  <span className="text-2xl ml-2 text-gray-600 dark:text-gray-400">
                    {time.period}
                  </span>
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
              <div className="flex items-center justify-center gap-4">
                {weatherIcon}
                <div className="text-xl font-medium text-gray-700 dark:text-gray-200">
                  Weather Preview
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;