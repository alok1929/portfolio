import React, { useState, useEffect } from 'react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const API_KEY = '26581d7af5c2ed4b636ec99f505a5c7a'; // Replace with your OpenWeather API key

  useEffect(() => {
    const savedCity = sessionStorage.getItem('savedCity');
    if (savedCity) {
      setCity(savedCity);
      fetchWeatherData(savedCity); // Fetch weather data for the saved city on component mount
    }
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCity(city);
    sessionStorage.setItem('savedCity', city); // Save city to sessionStorage
    fetchWeatherData(city); // Fetch weather data when the city is changed
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const getEmoji = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      default:
        return '';
    }
  };

  return (
    <div className="border-2 w-56 shadow-md bg-blue-200 rounded-lg px-2">
      <input
        className='m-2 rounded-md w-40 items-center text-center'
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
      />
      {weatherData && (
        <div className="">

          <div className='flex justify-between py-1'>
            <h2 className='py-4 px-8 bg-blue-400 text-white rounded-lg  mt-2'>{weatherData.name}</h2>
            <img
              className='bg-yellow-400 rounded-full py-2'
              src={getWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
            />
          </div>
          <div className='py-2 px-4'>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
         
          <div>
            <p className='bg-yellow-400 m-2 max-w-full rounded-md text-center'>
               {weatherData.weather[0].description} today
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
