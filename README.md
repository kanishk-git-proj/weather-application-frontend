# Weather Forecast Application

This is a weather forecast application with a React frontend and a Ruby on Rails backend. It allows users to fetch weather forecasts based on a given address with zipcode and country code, with caching on the frontend to reduce redundant API calls. If the same address with zipcode and country code are entered within 30 minutes, the application retrieves data from cache; otherwise, it fetches new data from the backend using Open Weather Map API.

## Features
- Fetches weather forecasts based on zip code and country code.
- Caches fetched data on the local storage on the browser for 30 minutes to reduce API calls.
- Visual indicator in the frontend showing whether data is from the cache or the API.
- Comprehensive error handling for invalid inputs or failed API calls.

## Getting Started
To run the weather forecast application, you'll need the following:
- Node.js and npm (Node Package Manager) for the frontend.
- Ruby and Rails for the backend.


### About Backend (Ruby on Rails)
1. The backend uses Ruby on Rails to provide weather forecast data based on zip code present in the address and country code.
2. The backend controller handles requests from the frontend and interacts with a weather service to retrieve forecast data.

### About Frontend (React)
1. The frontend is built with React and connects to the Rails backend for fetching weather data.
2. Cached data is stored in local storage, with a 30-minute expiration policy.
3. The CacheIndicator component visually indicates whether data is from the cache or the API.

### Installation
1. Clone the repository to your local machine.
   git clone https://github.com/kanishk-git-proj/weather-application.git
2. Navigate to the frontend project directory and install dependencies.
    cd your-file-path/weather-app
    npm install
3. Navigate to the backend project directory and install Ruby dependencies.
    cd ../weather_forecast_app
    bundle install
    
### Running the Backend
1. To start the Ruby on Rails server:
  rails server
This command starts the backend server on http://localhost:3000/ or another specified port.

### Running the Frontend
1. To start the React development server:
  npm start
This command starts the frontend on http://localhost:3001/. Ensure the Rails server is running for the frontend to connect with the backend.

### Using the Application
 1. Open the application in a web browser.
 2. Enter an address with a zip code and a country code like IN, US.
 3. Click the "Get Weather" button to fetch the weather forecast.
 4. The application checks if valid cached data is available. If not, it fetches fresh data from the Rails backend.
 5. The visual indicator shows if data is from the cache (blue) or the API (red).


### Important Files
1. app/controllers/weather_controller.rb: The Rails controller that handles forecast requests.
2  app/services/weather_service.rb: The Rails server that has the logic of calling the API of Open Weather Map
3. config/routes.rb: Defines the routes for the Rails application.


### Components
1. App: The main component handling form input, data fetching, and cache checks.
2. WeatherForecast: A component that displays weather forecast data.
3. ErrorModal: A modal component that displays error messages.

### Error Handling
1. Error messages are displayed in an error modal for invalid inputs or failed API calls.
2. If the Rails backend is unavailable or returns an error, the frontend shows appropriate error messages.

