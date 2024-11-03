import { useState } from "react";
import axios from "axios";
import weatherImage from './asset/weather.jpg';

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="weather-app relative w-full h-screen bg-black/40 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{
            backgroundImage: `url(${weatherImage})`,
        }}
      ></div>

      <div className="search text-center p-4">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
          className="px-6 py-3 text-lg rounded-full border border-white/80 bg-white/10 text-white placeholder-white"
        />
      </div>

      <div className="container max-w-lg h-[700px] mx-auto px-4 relative top-[10%] flex flex-col">
        <div className="top w-full my-4">
          <div className="location">
            <p className="text-2xl">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1 className="text-6xl">{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p className="bold text-lg font-bold">{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main && (
          <div className="bottom flex justify-evenly text-center w-full my-4 p-4 rounded-lg bg-white/20">
            <div className="feels">
              {data.main ? <p className="bold text-lg font-bold">{data.main.feels_like}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold text-lg font-bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold text-lg font-bold">{data.wind.speed} MPS</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
