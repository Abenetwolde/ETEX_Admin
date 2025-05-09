import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import {  IconChartBar, IconCheckbox, IconClock, IconGift, IconRepeat, IconStars, IconTrendingDown, IconTrendingUp, IconTrophy, IconUsers } from '@tabler/icons-react';
import React from 'react';

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

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          {/* Participation Card */}
          <Card className='@container/card h-[215px] mb-5'>
            <CardHeader>
              <CardDescription>Participation Status</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                12,345 <span className='text-muted-foreground'>/ 50,000</span>
              </CardTitle>
              <CardAction>
                <Progress value={25} className='h-2' />
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='flex items-center gap-2 font-medium'>
                <IconUsers className='size-4' />
                Active Participants
              </div>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-2 h-[180px] mb-5">
  {/* Quizzes Completed Card */}
  <Card className='flex-1'>
    <CardHeader className="h-full flex flex-col justify-center">
      <CardTitle className="flex items-center gap-2 text-lg">
        <IconCheckbox className="size-4 text-green-500" />
        12
      </CardTitle>
      <CardDescription className="text-xs mt-1">
        Quizzes Completed
      </CardDescription>
    </CardHeader>
  </Card>

  {/* Prizes Awarded Card */}
  <Card className='flex-1'>
    <CardHeader className="h-full flex flex-col justify-center">
      <CardTitle className="flex items-center gap-2 text-lg">
        <IconGift className="size-4 text-amber-500" />
        15
      </CardTitle>
      <CardDescription className="text-xs mt-1">
        Prizes Awarded
      </CardDescription>
    </CardHeader>
  </Card>
</div>

      

<div className="flex flex-col gap-2 h-[180px] mb-5">
  {/* Mini Prize Card */}
  <Card className='flex-1'>
    <CardHeader className="h-full flex flex-col justify-center">
      <CardTitle className="flex items-center gap-2 text-lg">
        <IconGift className="size-4 text-amber-500" />
        50 ETB
      </CardTitle>
      <CardDescription className="text-xs mt-1">
        Current Mini-Prize
      </CardDescription>
    </CardHeader>
  </Card>

  {/* Grand Prize Card */}
  <Card className='flex-1'>
    <CardHeader className="h-full flex flex-col justify-center">
      <CardTitle className="flex items-center gap-2 text-lg">
        <IconTrophy className="size-4 text-yellow-500" />
        iPhone 14
      </CardTitle>
      <CardDescription className="text-xs mt-1">
        Today's Grand Prize
      </CardDescription>
    </CardHeader>
  </Card>
</div>

          <div className="flex flex-col gap-2 h-[180px] mb-5">
            {/* Average Score Card */}
            <Card className='flex-1'>
              <CardHeader className="h-full flex flex-col justify-center ">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconChartBar className="size-4 text-primary" />
                  72%
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  Average Score
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Average Time Card */}
            <Card className=''>
              <CardHeader className="h-full flex flex-col justify-center ">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconClock className="size-4 text-primary" />
                  8 min
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                Average Session Duration
                  
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-2'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {/* sales arallel routes */}
            {sales}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
