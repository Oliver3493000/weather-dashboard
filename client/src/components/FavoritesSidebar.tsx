import { Star, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FavoriteCity } from '@/lib/favorites';

interface FavoritesSidebarProps {
  favorites: FavoriteCity[];
  currentCity?: string;
  onSelectCity: (city: string) => void;
  onRemoveFavorite: (city: string) => void;
}

export default function FavoritesSidebar({
  favorites,
  currentCity,
  onSelectCity,
  onRemoveFavorite,
}: FavoritesSidebarProps) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-400/20 rounded-lg">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Favorite Cities</h2>
      </div>
      <div className="space-y-3">
        {favorites.map((city) => {
          const isActive = currentCity?.toLowerCase() === city.name.toLowerCase();
          return (
            <div
              key={city.name}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/25 shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 hover:scale-102'
              }`}
            >
              <button
                onClick={() => onSelectCity(city.name)}
                className="w-full text-left p-4 flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/30' : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <MapPin className={`h-4 w-4 ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-white/90'
                  }`}>
                    {city.name}
                  </p>
                  {city.country && (
                    <p className="text-sm text-white/60">{city.country}</p>
                  )}
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(city.name);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg hover:bg-red-500/20"
              >
                <X className="h-4 w-4 text-red-400" />
              </Button>
              {isActive && (
                <div className="absolute inset-0 border-2 border-white/30 rounded-xl pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
