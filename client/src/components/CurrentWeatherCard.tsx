import { Heart, Droplets, Wind, Sunrise, Sunset, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CurrentWeather, getWeatherIconUrl } from '@/lib/weatherService';
import { format } from 'date-fns';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CurrentWeatherCard({
  weather,
  isFavorite,
  onToggleFavorite,
}: CurrentWeatherCardProps) {
  return (
    <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative p-8 md:p-12">
        {/* Header with city name and favorite button */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {weather.city}
            </h1>
            <p className="text-2xl text-white/80 font-medium">{weather.country}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className="h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110"
          >
            <Heart
              className={`h-7 w-7 transition-all ${
                isFavorite
                  ? 'fill-red-400 text-red-400 scale-110'
                  : 'text-white/80'
              }`}
            />
          </Button>
        </div>

        {/* Main weather display */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
              <img
                src={getWeatherIconUrl(weather.icon)}
                alt={weather.description}
                className="relative w-40 h-40 md:w-48 md:h-48 drop-shadow-2xl animate-float"
              />
            </div>
            <div>
              <div className="flex items-start gap-2 mb-3">
                <span className="text-8xl md:text-9xl font-bold text-white drop-shadow-lg animate-countup">
                  {weather.temperature}
                </span>
                <span className="text-5xl font-light text-white/80 mt-4">°C</span>
              </div>
              <p className="text-3xl text-white/90 capitalize font-medium">
                {weather.description}
              </p>
            </div>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-400/20 group-hover:bg-blue-400/30 transition-colors">
                <Thermometer className="h-5 w-5 text-blue-300" />
              </div>
              <p className="text-sm text-white/70 font-medium">Feels Like</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {weather.feelsLike}°
            </p>
          </div>

          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-400/20 group-hover:bg-cyan-400/30 transition-colors">
                <Droplets className="h-5 w-5 text-cyan-300" />
              </div>
              <p className="text-sm text-white/70 font-medium">Humidity</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {weather.humidity}%
            </p>
          </div>

          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-400/20 group-hover:bg-purple-400/30 transition-colors">
                <Wind className="h-5 w-5 text-purple-300" />
              </div>
              <p className="text-sm text-white/70 font-medium">Wind Speed</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {weather.windSpeed}
            </p>
            <p className="text-xs text-white/60 mt-1">m/s</p>
          </div>

          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/15 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-orange-400/20 group-hover:bg-orange-400/30 transition-colors">
                <Sunrise className="h-5 w-5 text-orange-300" />
              </div>
              <p className="text-sm text-white/70 font-medium">Sunrise</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {format(new Date(weather.sunrise * 1000), 'HH:mm')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
