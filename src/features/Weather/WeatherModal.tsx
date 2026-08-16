"use client";
import { useEffect, useState } from "react";

type WeatherData = {
  city: string;
  temperature: number;
  desc: string;
  icon: string;
};

export default function WeatherModal({ onClose }: { onClose: () => void }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Get user's location
  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const coords = await new Promise<{ lat: number; lon: number } | null>(
          (resolve) => {
            if (!navigator.geolocation) return resolve(null);
            navigator.geolocation.getCurrentPosition(
              (pos) =>
                resolve({
                  lat: pos.coords.latitude,
                  lon: pos.coords.longitude,
                }),
              () => resolve(null)
            );
          }
        );

        let url = "";
        if (coords) {
          url = `/api/weather?lat=${coords.lat}&lon=${coords.lon}`;
        } else {
          url = `/api/weather?city=amsterdam`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setWeather({
          city: data.city,
          temperature: data.temperature,
          desc: data.desc,
          icon: mapWeatherToIcon(data.desc, data.temperature),
        });
      } catch (error) {
        const res = await fetch(`/api/weather?city=amsterdam`);
        const data = await res.json();
        setWeather({
          city: data.city,
          temperature: data.temperature,
          desc: data.desc,
          icon: mapWeatherToIcon(data.desc, data.temperature),
        });
      }
    };

    fetchInitialWeather();
  }, []);

  const fetchWeather = async (q: string) => {
    const res = await fetch(`/api/weather?city=${q}`);
    const data = await res.json();
    setWeather({
      city: data.city,
      temperature: data.temperature,
      desc: data.desc,
      icon: mapWeatherToIcon(data.desc, data.temperature),
    });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="weather-title"
    >
      <div className="backdrop-blur-xl text-white p-6 rounded-2xl w-96 shadow-lg relative border border-white/20">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close weather details"
          className="absolute top-2 right-3 text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400"
        >
          ✕
        </button>

        {/* Show weather info */}
        {weather ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-yellow-400">
              📍 Showing weather for {weather.city}
            </p>
            <h2 className="text-2xl font-bold">{weather.city}</h2>
            <p className="capitalize">{weather.desc}</p>
            <p className="text-3xl font-extrabold">
              {Math.round(weather.temperature)}°C
            </p>
            <div className="text-6xl">{weather.icon}</div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}

        {/* Search input */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            aria-label="Search city name"
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => fetchWeather(city)}
              className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
            >
              Search
            </button>
            <button
              onClick={() => {
                setCity("");
                setWeather(null);
              }}
              className="px-3 py-2 border border-gray-500 rounded hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map weather description to icon
function mapWeatherToIcon(desc: string, temp: number) {
  desc = desc.toLowerCase();

  if (desc.includes("cloud")) return "⛅";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("clear")) return "☀️";
  if (temp < 5) return "❄️";
  return "🌤️";
}
