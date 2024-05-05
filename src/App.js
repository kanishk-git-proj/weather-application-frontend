import React, { useState, useEffect } from 'react';
import WeatherForecast from './components/WeatherForecast';
import ErrorModal from './components/ErrorModal';
import './App.css'; // Main CSS for your app

// Cache expiry time in milliseconds (30 minutes)
const CACHE_EXPIRY_TIME = 30 * 60 * 1000;

// Utility function to extract zip code from an address
const extractZipCode = (address) => {
  const regex = /\b\d{5,9}\b/; // Matches 5 to 9 digits
  const matches = address.match(regex);
  return matches ? matches[0] : null;
};

// Component for visual indicator with a label showing the data source
const CacheIndicator = ({ fromCache }) => {
  const indicatorStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: fromCache ? 'blue' : 'red',
    display: 'inline-block',
    marginRight: '5px', // Space between the indicator and text
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <div style={indicatorStyle} />
      <span>{fromCache ? 'Data from Cache' : 'Data from API'}</span> {/* Text label beside the indicator */}
    </div>
  );
};

const App = () => {
  const [address, setAddress] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  const checkCache = (zipCode, countryCode) => {
    const cacheKey = `${zipCode}-${countryCode}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const cacheTimestamp = parsedData.timestamp;
      const isCacheExpired = Date.now() - cacheTimestamp > CACHE_EXPIRY_TIME;

      if (!isCacheExpired) {
        setForecastData(parsedData.data);
        setFromCache(true); // Data from cache
        setError(null);
        return true; // Cache is valid
      }
    }

    return false; // Cache is not valid
  };

  const fetchForecast = async (zipCode, countryCode) => {
    if (zipCode && countryCode) {
      if (checkCache(zipCode, countryCode)) {
        return; // If valid cache exists, return early
      }

      const cacheKey = `${zipCode}-${countryCode}`;

      try {
        const response = await fetch(`http://localhost:3000/forecast?zip=${zipCode}&country=${countryCode}`);
        if (!response.ok) {
          throw new Error('Unable to fetch forecast. Check your zip code and country code.');
        }

        const data = await response.json();

        // Store in local storage with a timestamp
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          })
        );

        setForecastData(data);
        setFromCache(false); // Data from API
        setError(null);
        setIsModalOpen(false);
      } catch (error) {
        setError(error.message);
        setIsModalOpen(true);
        setForecastData(null);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const zipCode = extractZipCode(address);
    if (zipCode && countryCode) {
      await fetchForecast(zipCode, countryCode); // Fetch data based on zip code and country code
    } else {
      setError("Invalid address or missing country code.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Address with Zip Code:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Country Code:
          <input
            type="text"
            value={countryCode}
            onChange = {((e) => setCountryCode(e.target.value))}
          />
        </label>
        <br />
        <button type="submit">Get Weather</button>
        &nbsp;&nbsp;
        {forecastData && <CacheIndicator fromCache={fromCache} />} {/* Indicator with text */}

        <ErrorModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          errorMessage={error}
        />
      </form>

      {forecastData ? (
        <WeatherForecast data={forecastData} />
      ) : (
        <p>Enter an address with a zip code and a country code to get the weather forecast.</p>
      )}
    </div>
  );
};

export default App;
