import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState(''); // State for storing user input city
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false); // Set loading state to false initially
    const [error, setError] = useState(null);

    const fetchWeather = async (cityName) => {
        setLoading(true); // Start loading when fetching begins
        setError(null); // Clear any previous errors
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
            );
            const data = await response.json();
            if (response.ok) {
                setWeatherData(data);
            } else {
                setError(data.message); // Handle error from API
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== '') {
            fetchWeather(city); 
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#5a7c97' }}>
            <div className="card text-light d-flex justify-content-center align-items-center" 
                style={{ width: "100%", maxWidth: "600px", backgroundColor: "#ae4a61c0", borderRadius: '20px', padding: '20px' }}>
                <div className="card-body w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <form onSubmit={handleSubmit} className="mb-4 w-100">
                            <input 
                                className='w-100 border rounded p-3 mb-3 text-success'
                                type="text"
                                value={city} // Controlled input field
                                onChange={(e) => setCity(e.target.value)} // Update city state on input change
                                placeholder="Enter city name"
                                style={{ textAlign: 'center', fontSize: '16px' }}
                            />
                            <div className='text-center'>
                                <button type="submit" className="btn btn-success w-50 mt-2" style={{ fontSize: '16px' }}>
                                    Get Weather
                                </button>
                            </div>
                        </form>
                    </div>

                    {loading && <div className="text-center mt-5">Loading...</div>}
                    {error && <div className="text-center mt-5">Error: {error}</div>}
                    
                    {weatherData && !loading && !error && (
                        <div className="text-center">
                            <h3 className="card-title">
                                Weather in {weatherData.name}
                            </h3>
                            <p className="card-text">
                                <span>Temperature:</span> {weatherData.main.temp}°C
                            </p>
                            <p className="card-text">
                                <span>Feels Like:</span> {weatherData.main.feels_like}°C
                            </p>
                          
                            <p className="card-text">
                                <span>Weather:</span> {weatherData.weather[0].description}
                            </p>
                          
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
