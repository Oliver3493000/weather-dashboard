import { DailyForecast } from '@/lib/weatherService';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { format } from 'date-fns';
import { TrendingUp, CloudRain } from 'lucide-react';

interface WeatherChartsProps {
  forecasts: DailyForecast[];
}

export default function WeatherCharts({ forecasts }: WeatherChartsProps) {
  // Prepare data for charts
  const chartData = forecasts.map((forecast) => ({
    date: format(new Date(forecast.date * 1000), 'MMM d'),
    tempMax: forecast.tempMax,
    tempMin: forecast.tempMin,
    precipitation: forecast.pop,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temperature Trend Chart */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-orange-400/20 rounded-xl">
            <TrendingUp className="h-6 w-6 text-orange-300" />
          </div>
          <h3 className="text-2xl font-bold text-white">Temperature Trend</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              fontWeight={500}
              unit="°C"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
              labelStyle={{ color: '#fff', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="tempMax"
              stroke="#fb923c"
              strokeWidth={3}
              fill="url(#colorMax)"
              name="Max Temp"
              dot={{ fill: '#fb923c', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
            />
            <Area
              type="monotone"
              dataKey="tempMin"
              stroke="#60a5fa"
              strokeWidth={3}
              fill="url(#colorMin)"
              name="Min Temp"
              dot={{ fill: '#60a5fa', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Precipitation Probability Chart */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-400/20 rounded-xl">
            <CloudRain className="h-6 w-6 text-blue-300" />
          </div>
          <h3 className="text-2xl font-bold text-white">Rain Probability</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              fontWeight={500}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              fontWeight={500}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
              labelStyle={{ color: '#fff', fontWeight: 600 }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Bar
              dataKey="precipitation"
              fill="url(#barGradient)"
              radius={[12, 12, 0, 0]}
              name="Precipitation"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
