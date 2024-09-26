import { weather_type, fetchWeatherResponse } from "./types";

const API_KEY = "34d8ea5330230d34c31c06aeb55a564e";

export const fetchWeather = async (city: string) : Promise<fetchWeatherResponse> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data =  await response.json();
    if(response.status !== 200) throw new Error('City not found');
    const weatherDescription = data.weather[0].main;
    const temperature = data.main.temp;
    const location = data.name;

    const weatherMap: { [key: string]: weather_type } = {
        Clear: "Clear",
        Thunderstorm: "Thunder",
        Rain: "Showers",
        Drizzle: "Light Rain",
        Clouds: data.clouds.all > 50 ? "Heavy Cloud" : "Light Cloud",
        Snow: "Snow",
        Hail: "Hail"
    };

    const weather = weatherMap[weatherDescription] || "Clear";

    return { location, weather, temperature };
};