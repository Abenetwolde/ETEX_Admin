"use client";
import axiosInstance from '@/Apis/axiosInstance';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent
} from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Progress } from '@radix-ui/react-progress';
import { IconChartBar, IconCheckbox, IconClock, IconGift, IconRepeat, IconStars, IconTrendingDown, IconTrendingUp, IconTrophy, IconUsers } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Apis/store';
const TotalQuestionsCard = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = useSelector((state: RootState) => state.admin.token);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/questions', {
          headers: {
            'Authorization': token
          },
        });
        // Response is an array of questions; count the total
        setTotalQuestions(response.data.length || 0);
      } catch (err) {
        setError(err.message || 'Failed to load questions count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const maxQuestions = 4000; // Example max for progress bar; adjust as needed
  const progressValue = (totalQuestions / maxQuestions) * 100;

  return (
    <Card className="mb-5 h-[180px]">
      <CardHeader className="h-full flex flex-col justify-between">
        <CardDescription className="text-left">Total Questions</CardDescription>
        <div className="flex items-center justify-center flex-1">
          {isLoading ? (
            <div className="w-32 h-8 bg-muted rounded-lg animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
          ) : error ? (
            <CardTitle className="text-2xl font-semibold text-destructive">
              Error
            </CardTitle>
          ) : (
            <CardTitle className="text-2xl font-semibold tabular-nums">
              <span className="text-muted-foreground">{totalQuestions.toLocaleString()}</span>
            </CardTitle>
          )}
        </div>
        <CardAction>
          <Progress value={progressValue} className="h-2" />
        </CardAction>
      </CardHeader>
    </Card>
  );
};
const TotalRegisteredParticipantsCard = () => {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = useSelector((state: RootState) => state.admin.token);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/users', {
          headers: {
            'Authorization': token
          },
        });
        setTotalParticipants(response.data.user_count || 0);
      } catch (err) {
        setError(err.message || 'Failed to load participants count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <Card className="mb-5 h-[180px]">
      <CardHeader className="h-full flex flex-col justify-between">
        <CardDescription className="text-left">Total Registered Participants</CardDescription>
        <div className="flex items-center justify-center flex-1">
          {isLoading ? (
            <div className="w-32 h-8 bg-muted rounded-lg animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
            </div>
          ) : error ? (
            <CardTitle className="text-2xl font-semibold text-destructive">
              Error
            </CardTitle>
          ) : (
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {totalParticipants.toLocaleString()} <span className="text-muted-foreground"></span>
            </CardTitle>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

 
const MiniPrizesCard = () => {
  const [miniPrizes, setMiniPrizes] = useState([]);
  const [grandPrizes, setGrandPrizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let token = useSelector((state: RootState) => state.admin.token);

  useEffect(() => {
    const fetchPrizes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [miniPrizesResponse, grandPrizesResponse] = await Promise.all([
          axiosInstance.get('/miniprizes', { headers: { 'Authorization': token } }),
          axiosInstance.get('/grandprizes', { headers: { 'Authorization': token } })
        ]);

        setMiniPrizes(miniPrizesResponse.data || []);
        setGrandPrizes(grandPrizesResponse.data || []);
      } catch (err) {
        setError(err?.message || 'Failed to load prizes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  const prizes = [...(miniPrizes || []), ...(grandPrizes || [])].filter((prize) => prize);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Card className="bg-card text-card-foreground shadow-md h-[180px] mb-5">
      {isLoading ? (
        <CardContent className="flex h-full justify-center py-1">
          <div className="bg-muted h-full w-full animate-pulse rounded-lg">
            <div className="via-foreground/10 animate-shimmer h-full w-full bg-gradient-to-r from-transparent to-transparent"></div>
          </div>
        </CardContent>
      ) : error ? (
        <CardContent className="py-1">
          <p className="text-destructive text-center">{error}</p>
        </CardContent>
      ) : prizes.length === 0 ? (
        <CardContent className="py-1">
          <p className="text-muted-foreground text-center">No prizes available</p>
        </CardContent>
      ) : (
        <>
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000
              })
            ]}
            className="w-full"
          >
            <CarouselContent>
              {prizes.map((prize, index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{prize?.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-1">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-2 h-16 w-16">
                        <Image
                          src={prize?.image_url}
                          alt={prize?.name}
                          fill
                          className="rounded-lg object-cover shadow-md"
                        />
                      </div>
                      <p className="text-muted-foreground text-center text-xs">{prize.name}</p>
                    </div>
                  </CardContent>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-1 flex justify-center space-x-2">
            {prizes?.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === selectedIndex ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};
export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

<div className="grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-3 lg:grid-cols-3">
  {/* Total Registered Participants Card */}
  <TotalRegisteredParticipantsCard />

  {/* Mini Prizes Card */}
  <MiniPrizesCard />

  {/* Total Questions Card */}
  <TotalQuestionsCard />
</div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {/* sales arallel routes */}
            {sales}
          </div>
          {/* <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div> */}
        </div>
      </div>
    </PageContainer>
  );
}
