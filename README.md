# Weather Dashboard

A modern, responsive weather dashboard application that displays real-time weather information for cities worldwide. Built with React, TypeScript, and Tailwind CSS.

![Weather Dashboard](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue)

## 🌟 Features

### Core Features
- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **7-Day Forecast**: View detailed weather predictions for the next week
- **City Search**: Search for any city with instant results
- **Favorite Cities**: Save your frequently checked cities for quick access
- **Dynamic Backgrounds**: Background colors change based on weather conditions (sunny, cloudy, rainy, night)

### Advanced Features
- **Interactive Charts**: 
  - Temperature trend line chart showing max/min temperatures
  - Precipitation probability bar chart
- **Responsive Design**: Optimized for mobile (375px), tablet (768px), and desktop (1920px)
- **Smooth Animations**:
  - Floating weather icons
  - Temperature count-up effect
  - Fade transitions when switching cities
- **Loading States**: Skeleton screens for better UX during data fetching

### Pre-loaded Cities
- Beijing, China
- New York, USA
- London, UK
- Tokyo, Japan
- Sydney, Australia

## 🛠️ Tech Stack

**Frontend Framework:**
- React 19
- TypeScript 5
- Vite (Build tool)

**Styling:**
- Tailwind CSS 4
- shadcn/ui components
- Custom animations

**Data Visualization:**
- Recharts (for temperature trends and precipitation charts)

**API:**
- OpenWeatherMap API (free tier: 1,000 calls/day)

**State Management:**
- React Hooks (useState, useEffect)
- LocalStorage (for favorite cities)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api):
   - Sign up for a free account
   - Navigate to "API Keys" in your dashboard
   - Copy your API key
   - Note: New API keys may take 10-60 minutes to activate

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `VITE_OPENWEATHER_API_KEY` = `your_api_key`

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `https://your-project.vercel.app`

### Build for Production

```bash
pnpm build
```

The optimized production build will be in the `dist` folder.

## 📱 Responsive Design

The application is fully responsive across all devices:

- **Mobile** (375px): Single column layout, stacked components
- **Tablet** (768px): Optimized spacing and font sizes
- **Desktop** (1920px): Full layout with sidebar and main content area

## 🎨 Design Features

### Dynamic Weather Backgrounds
- **Sunny**: Blue gradient (from-blue-400 to-blue-600)
- **Cloudy**: Gray gradient (from-gray-400 to-gray-600)
- **Rainy**: Dark gray gradient (from-gray-600 to-gray-800)
- **Night**: Deep blue/purple gradient (from-indigo-900 to-purple-900)

### Animations
- Floating weather icons (3s ease-in-out loop)
- Temperature count-up effect on load
- Smooth fade transitions between cities
- Hover effects on all interactive elements

## 📊 API Usage

The app uses OpenWeatherMap API with two main endpoints:

1. **Current Weather**: `/weather?q={city}`
2. **5-Day Forecast**: `/forecast?q={city}` (processed to show 7 days)

All temperatures are displayed in Celsius (metric units).

## 🔧 Project Structure

```
weather-dashboard/
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CurrentWeatherCard.tsx
│   │   │   ├── ForecastCards.tsx
│   │   │   ├── FavoritesSidebar.tsx
│   │   │   ├── WeatherCharts.tsx
│   │   │   └── WeatherSkeleton.tsx
│   │   ├── lib/              # Utilities and services
│   │   │   ├── weatherService.ts
│   │   │   └── favorites.ts
│   │   ├── pages/            # Page components
│   │   │   └── Home.tsx
│   │   ├── App.tsx           # Main app component
│   │   └── index.css         # Global styles
│   └── public/               # Static assets
├── README.md
└── package.json
```

## 🐛 Troubleshooting

### API Key Issues
- **401 Error**: API key not activated yet (wait 10-60 minutes after registration)
- **404 Error**: City name not found (check spelling)
- **Rate Limit**: Free tier allows 1,000 calls/day

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Clear Vite cache: `rm -rf .vite`

## 📄 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
