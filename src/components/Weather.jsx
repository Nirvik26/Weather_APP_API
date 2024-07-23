import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assests/search.png";
import clear_icon from "../assests/sun.png";
import cloudy_icon from "../assests/cloudy.png";
import drizzle_icon from "../assests/drizzle.png";
import rain_icon from "../assests/rain.png";
import snow_icon from "../assests/snow.png";
import humidity_icon from "../assests/weather.png";
import wind_icon from "../assests/wind.png";
const appId = process.env.REACT_APP_APP_ID;

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("City name cannot be empty");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appId}`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon || clear_icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Lalitpur");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          className="text"
          placeholder="Search"
        />
        <img
          src={search_icon}
          alt=""
          srcset=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt=""
            srcset=""
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" srcset="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" srcset="" />
              <div>
                <p>{weatherData.windSpeed}Km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
