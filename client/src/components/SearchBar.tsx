import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            {isLoading ? (
              <Loader2 className="h-6 w-6 text-white/60 animate-spin" />
            ) : (
              <Search className="h-6 w-6 text-white/60" />
            )}
          </div>
          <Input
            type="text"
            placeholder="Search for any city worldwide..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-14 pr-6 h-16 text-lg bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all rounded-2xl shadow-lg"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !query.trim()}
          className="h-16 px-8 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-xl rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Search
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
