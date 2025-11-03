const FAVORITES_KEY = 'weather-favorites';

export interface FavoriteCity {
  name: string;
  country?: string;
}

/**
 * Get all favorite cities from localStorage
 */
export function getFavorites(): FavoriteCity[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
    return [];
  }
}

/**
 * Add a city to favorites
 */
export function addFavorite(city: FavoriteCity): void {
  try {
    const favorites = getFavorites();
    
    // Check if city already exists
    const exists = favorites.some(
      (fav) => fav.name.toLowerCase() === city.name.toLowerCase()
    );
    
    if (!exists) {
      favorites.push(city);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Failed to add favorite:', error);
  }
}

/**
 * Remove a city from favorites
 */
export function removeFavorite(cityName: string): void {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(
      (fav) => fav.name.toLowerCase() !== cityName.toLowerCase()
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove favorite:', error);
  }
}

/**
 * Check if a city is in favorites
 */
export function isFavorite(cityName: string): boolean {
  const favorites = getFavorites();
  return favorites.some(
    (fav) => fav.name.toLowerCase() === cityName.toLowerCase()
  );
}

/**
 * Initialize with default cities if no favorites exist
 */
export function initializeDefaultCities(): void {
  const favorites = getFavorites();
  
  if (favorites.length === 0) {
    const defaultCities: FavoriteCity[] = [
      { name: 'Beijing', country: 'CN' },
      { name: 'New York', country: 'US' },
      { name: 'London', country: 'GB' },
      { name: 'Tokyo', country: 'JP' },
      { name: 'Sydney', country: 'AU' },
    ];
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(defaultCities));
  }
}
