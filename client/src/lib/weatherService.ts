import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  sunrise: number;
  sunset: number;
  icon: string;
  main: string;
}

export interface DailyForecast {
  date: number;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  main: string;
  pop: number; // Probability of precipitation
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: DailyForecast[];
}

/**
 * Fetch current weather data for a city
 */
export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}

/**
 * Fetch 7-day weather forecast for a city
 */
export async function getForecast(city: string): Promise<DailyForecast[]> {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    
    // Group forecasts by day (API returns 3-hour intervals)
    const dailyData: { [key: string]: any[] } = {};
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Get the next 7 days
    const forecasts: DailyForecast[] = Object.entries(dailyData)
      .slice(0, 7)
      .map(([_, dayData]) => {
        const temps = dayData.map((d) => d.main.temp);
        const pops = dayData.map((d) => d.pop || 0);
        const midDayData = dayData[Math.floor(dayData.length / 2)];

        return {
          date: dayData[0].dt,
          tempMax: Math.round(Math.max(...temps)),
          tempMin: Math.round(Math.min(...temps)),
          description: midDayData.weather[0].description,
          icon: midDayData.weather[0].icon,
          main: midDayData.weather[0].main,
          pop: Math.round(Math.max(...pops) * 100),
        };
      });

    return forecasts;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch forecast data. Please try again later.');
  }
}

/**
 * Fetch both current weather and forecast in one call
 */
export async function getWeatherData(city: string): Promise<WeatherData> {
  const [current, forecast] = await Promise.all([
    getCurrentWeather(city),
    getForecast(city),
  ]);

  return { current, forecast };
}

/**
 * Get weather icon URL from OpenWeatherMap
 */
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

/**
 * Determine background gradient based on weather condition
 */
export function getWeatherGradient(main: string, icon: string): string {
  const isNight = icon.endsWith('n');
  
  if (isNight) {
    return 'from-indigo-900 via-blue-900 to-purple-900';
  }
  
  switch (main.toLowerCase()) {
    case 'clear':
      return 'from-blue-400 via-blue-500 to-blue-600';
    case 'clouds':
      return 'from-gray-400 via-gray-500 to-gray-600';
    case 'rain':
    case 'drizzle':
      return 'from-gray-600 via-gray-700 to-gray-800';
    case 'thunderstorm':
      return 'from-gray-700 via-gray-800 to-gray-900';
    case 'snow':
      return 'from-blue-200 via-blue-300 to-blue-400';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'from-gray-300 via-gray-400 to-gray-500';
    default:
      return 'from-blue-400 via-blue-500 to-blue-600';
  }
}
