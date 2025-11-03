import { DailyForecast, getWeatherIconUrl } from '@/lib/weatherService';
import { format } from 'date-fns';
import { Droplet } from 'lucide-react';

interface ForecastCardsProps {
  forecasts: DailyForecast[];
}

export default function ForecastCards({ forecasts }: ForecastCardsProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
        7-Day Forecast
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {forecasts.map((forecast, index) => {
          const isToday = index === 0;
          return (
            <div
              key={index}
              className={`group flex-shrink-0 w-44 md:w-52 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isToday ? 'ring-2 ring-white/40' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex flex-col items-center text-center">
                {/* Date */}
                <div className="mb-4">
                  {isToday ? (
                    <p className="text-lg font-bold text-white">Today</p>
                  ) : (
                    <p className="text-base font-semibold text-white/90">
                      {format(new Date(forecast.date * 1000), 'EEE')}
                    </p>
                  )}
                  <p className="text-sm text-white/60">
                    {format(new Date(forecast.date * 1000), 'MMM d')}
                  </p>
                </div>

                {/* Weather icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl" />
                  <img
                    src={getWeatherIconUrl(forecast.icon)}
                    alt={forecast.description}
                    className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-lg animate-float"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  />
                </div>

                {/* Temperature range */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-2 justify-center">
                    <p className="text-3xl font-bold text-white">
                      {forecast.tempMax}°
                    </p>
                    <p className="text-xl text-white/60 font-medium">
                      {forecast.tempMin}°
                    </p>
                  </div>
                </div>

                {/* Weather description */}
                <p className="text-sm text-white/80 capitalize mb-3 min-h-[2.5rem] flex items-center">
                  {forecast.description}
                </p>

                {/* Precipitation probability */}
                {forecast.pop > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-400/20 backdrop-blur-sm">
                    <Droplet className="w-4 h-4 text-blue-300" />
                    <span className="text-sm font-semibold text-blue-200">
                      {forecast.pop}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
