"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudRain, Loader2, MapPin, Wind, Droplets, ThermometerSun } from 'lucide-react';

export default function WeatherForecast() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [location, setLocation] = useState({ lat: '', lon: '' });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4)
        });
      }, (error) => {
        console.error("Error getting location", error);
        alert("Could not get your location. Please enter manually.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeather = async () => {
    if (!location.lat || !location.lon) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/weather/forecast?lat=${location.lat}&lon=${location.lon}`);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
          <CloudRain className="h-8 w-8 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Weather Forecast</h1>
        <p className="text-xl text-gray-600">Real-time agriculture-focused weather predictions.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
          <input type="number" value={location.lat} onChange={(e) => setLocation({...location, lat: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 28.6139" />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
          <input type="number" value={location.lon} onChange={(e) => setLocation({...location, lon: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 77.2090" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={getUserLocation} className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center" title="Get My Location">
            <MapPin className="h-5 w-5" />
          </button>
          <button onClick={fetchWeather} disabled={loading || !location.lat} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex-1 flex items-center justify-center min-w-[140px]">
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Get Forecast'}
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg h-full flex flex-col justify-between">
              <div>
                <p className="text-blue-100 font-medium mb-1">Current Weather</p>
                <h2 className="text-6xl font-bold mb-4">{result.temperature}°C</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-blue-100">
                  <Wind className="h-5 w-5 mr-3" />
                  <span>Wind: {result.windspeed} km/h</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <ThermometerSun className="h-5 w-5 mr-3" />
                  <span>Weather Code: {result.weathercode}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">7-Day Forecast</h3>
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4 min-w-max">
                  {result.forecast.time?.map((time: string, idx: number) => {
                    const date = new Date(time);
                    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                    return (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 w-28 text-center border border-gray-100 flex-shrink-0">
                        <p className="text-gray-500 text-sm font-medium mb-2">{day}</p>
                        <div className="text-blue-500 mb-2 flex justify-center">
                          {result.forecast.precipitation_sum[idx] > 0 ? <CloudRain className="h-8 w-8" /> : <ThermometerSun className="h-8 w-8 text-amber-500" />}
                        </div>
                        <p className="font-bold text-gray-900">{result.forecast.temperature_2m_max[idx]}°</p>
                        <p className="text-sm text-gray-500">{result.forecast.temperature_2m_min[idx]}°</p>
                        <p className="text-xs text-blue-600 mt-2 font-medium">{result.forecast.precipitation_sum[idx]}mm rain</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
