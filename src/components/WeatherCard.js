// src/components/WeatherCard.js
import React from 'react';
import './WeatherCard.css'; // Import your custom CSS for styling

const WeatherCard = ({ forecast }) => {
  const { dt_txt, main, weather, wind, clouds } = forecast;

  return (
    <div className="weather-card">
      <h3>{new Date(dt_txt).toLocaleString()}</h3>
      <p>
        <strong>Temperature:</strong> {main.temp} K ({(main.temp - 273.15).toFixed(2)} °C)
      </p>
      <p>
        <strong>Weather:</strong> {weather[0].description}
      </p>
      <p>
        <strong>Humidity:</strong> {main.humidity}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {wind.speed} m/s
      </p>
      <p>
        <strong>Cloud Cover:</strong> {clouds.all}%
      </p>
    </div>
  );
};

export default WeatherCard;
