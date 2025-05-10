"use client";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/Apis/store';
import axiosInstance from '@/Apis/axiosInstance';

const RecentWinners = () => {
  const [winners, setWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state: RootState) => state.admin.token);

  useEffect(() => {
    const fetchWinners = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [grandResponse, miniResponse] = await Promise.all([
          axiosInstance.get('/grand_lottery/winners', { headers: { 'Authorization': token } }),
          axiosInstance.get('/mini_lottery/winners', { headers: { 'Authorization': token } }),
        ]);
        console.log('Grand Response:', grandResponse.data);
        console.log('Mini Response:', miniResponse.data);

        const grandWinners = Array.isArray(grandResponse.data)
          ? grandResponse.data.map(w => ({ ...w, prize_type: 'Grand' }))
          : [];
        const miniWinners = Array.isArray(miniResponse.data)
          ? miniResponse.data.map(w => ({ ...w, prize_type: 'Mini' }))
          : [];
        setWinners([...grandWinners, ...miniWinners]);
      } catch (err) {
        setError(err.message || 'Failed to load winners');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWinners();
  }, [token]);

  console.log("winners", winners);

  const salesData = winners?.map(winner => {
    const prizeName = winner.prize_type === 'Grand' ? 'Phone' : 'Digital Watch';
    return {
      avatar: '/placeholder-avatar.jpg', // Replace with actual avatar URL if available
      fallback: winner.winner_name.charAt(0) || 'U', // Fallback to 'U' if undefined
      name: winner.winner_name || 'Unknown Winner',
      email: `Prize: ${winner.prize_type} - ${prizeName}`,
      amount: '',
    };
  }) || [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Lottery Winners</CardTitle>
        <CardDescription>Check out the latest winners of Grand and Mini prizes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {isLoading ? (
            <div className="w-full h-32 bg-[var(--muted)] rounded-lg animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--foreground)]/10 to-transparent animate-shimmer"></div>
            </div>
          ) : error ? (
            <p className="text-[var(--destructive)] text-center">{error}</p>
          ) : salesData.length === 0 ? (
            <p className="text-[var(--muted-foreground)] text-center">No winners available</p>
          ) : (
            salesData.map((sale, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={sale.avatar} alt="Avatar" />
                  <AvatarFallback>{sale.fallback}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm leading-none font-medium">{sale.name}</p>
                  <p className="text-muted-foreground text-sm">{sale.email}</p>
                </div>
                <div className="ml-auto font-medium">{sale.amount}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentWinners;