"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, defs, LinearGradient, Stop } from 'recharts';
import axiosInstance from '@/Apis/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '@/Apis/store';

const EligibilityTimeSeriesCard = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = useSelector((state: RootState) => state.admin.token);

  useEffect(() => {
    const fetchTimeSeries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/grand_lottery/eligibility_time_series', {
          headers: {
            'Authorization': token
          },
          params: {
            start_time: '2025-05-09T08:00:00Z',
            end_time: '2025-05-09T12:00:00Z'
          }
        });

        setTimeSeriesData(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load time series data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeSeries();
  }, [token]);

  // Format the data for recharts
  const chartData = timeSeriesData.map(item => ({
    time: `${new Date(item.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    count: item.eligible_users_count,
  }));

  return (
    <Card className="bg-[var(--card)] text-[var(--card-foreground)] shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Eligibility Over Time (May 9, 2025)</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        {isLoading ? (
          <div className="w-full h-32 bg-[var(--muted)] rounded-lg animate-pulse">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--foreground)]/10 to-transparent animate-shimmer"></div>
          </div>
        ) : error ? (
          <p className="text-[var(--destructive)] text-center">{error}</p>
        ) : timeSeriesData.length === 0 ? (
          <p className="text-[var(--muted-foreground)] text-center">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickLine={{ stroke: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--muted)' }}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickLine={{ stroke: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--muted)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--foreground)',
                }}
              />
              <Bar
                dataKey="count"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EligibilityTimeSeriesCard;