import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import ForecastCards from '@/components/ForecastCards';
import FavoritesSidebar from '@/components/FavoritesSidebar';
import WeatherCharts from '@/components/WeatherCharts';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import {
  getWeatherData,
  getWeatherGradient,
  CurrentWeather,
  DailyForecast,
} from '@/lib/weatherService';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  initializeDefaultCities,
  FavoriteCity,
} from '@/lib/favorites';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState('from-blue-400 via-blue-500 to-blue-600');

  // Initialize favorites on mount
  useEffect(() => {
    initializeDefaultCities();
    setFavorites(getFavorites());
    
    // Load default city (Beijing) - silent fail on initial load
    const loadDefaultCity = async () => {
      setIsLoading(true);
      try {
        const data = await getWeatherData('Beijing');
        setCurrentWeather(data.current);
        setForecast(data.forecast);
        setBackgroundGradient(getWeatherGradient(data.current.main, data.current.icon));
      } catch (error) {
        // Silent fail on initial load - don't show error to user
        console.log('Initial load failed, waiting for user to search');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDefaultCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    try {
      const data = await getWeatherData(city);
      setCurrentWeather(data.current);
      setForecast(data.forecast);
      setBackgroundGradient(getWeatherGradient(data.current.main, data.current.icon));
      toast.success(`Weather loaded for ${data.current.city}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      toast.error(errorMessage);
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!currentWeather) return;

    if (isFavorite(currentWeather.city)) {
      removeFavorite(currentWeather.city);
      toast.success(`${currentWeather.city} removed from favorites`);
    } else {
      addFavorite({ name: currentWeather.city, country: currentWeather.country });
      toast.success(`${currentWeather.city} added to favorites`);
    }
    setFavorites(getFavorites());
  };

  const handleRemoveFavorite = (city: string) => {
    removeFavorite(city);
    setFavorites(getFavorites());
    toast.success(`${city} removed from favorites`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Header */}
      <header className="relative bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                Weather Dashboard
              </h1>
              <p className="text-white/90 text-xl md:text-2xl font-medium">
                Real-time weather information for cities worldwide
              </p>
            </div>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Favorites */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-8">
              <FavoritesSidebar
                favorites={favorites}
                currentCity={currentWeather?.city}
                onSelectCity={handleSearch}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </div>
          </aside>

          {/* Main Weather Content */}
          <div className="flex-1 space-y-8">
            {isLoading ? (
              <WeatherSkeleton />
            ) : currentWeather && forecast.length > 0 ? (
              <>
                <CurrentWeatherCard
                  weather={currentWeather}
                  isFavorite={isFavorite(currentWeather.city)}
                  onToggleFavorite={handleToggleFavorite}
                />
                <ForecastCards forecasts={forecast} />
                <WeatherCharts forecasts={forecast} />
              </>
            ) : (
              <div className="flex items-center justify-center py-32">
                <div className="text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
                  <Search className="h-16 w-16 text-white/60 mx-auto mb-6" />
                  <p className="text-white text-2xl font-semibold mb-2">
                    Search for a city
                  </p>
                  <p className="text-white/70 text-lg">
                    Enter a city name above to see weather information
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black/10 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="container py-8 text-center">
          <p className="text-white/70 text-lg">
            Weather data provided by <span className="font-semibold text-white">OpenWeatherMap</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
