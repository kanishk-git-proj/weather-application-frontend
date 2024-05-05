// src/components/WeatherForecast.js
import React from 'react';
import WeatherCard from './WeatherCard';
import './WeatherForecast.css'; // Custom CSS for the forecast component

const WeatherForecast = ({ data }) => {
  const { list, city } = data.forecast;

  return (
    <div className="weather-forecast">
      <h2>Weather Forecast for {city.name}</h2>
      <div className="forecast-list">
        {list.map((forecast, index) => (
          <WeatherCard key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
