'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IconRefresh, IconEye, IconTrophy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import Image from 'next/image';
import {
  useGetEligibleParticipantsQuery,
  useGetGrandPrizesQuery,
  useGetMiniPrizesQuery
} from '@/Apis/users';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

// import { useEmblaCarousel } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import axiosInstance from '@/Apis/axiosInstance';

// Dummy data for participants
const participantsData = [
  {
    id: 1,
    name: 'Alice Johnson',
    score: 1200,
    prizesWon: ['Gift Card', 'T-Shirt'],
    lastActive: '2025-05-08T10:30:00Z'
  },
  {
    id: 2,
    name: 'Bob Smith',
    score: 950,
    prizesWon: ['Headphones'],
    lastActive: '2025-05-07T14:20:00Z'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    score: 1800,
    prizesWon: ['Tesla Model S'],
    lastActive: '2025-05-06T09:15:00Z'
  },
  {
    id: 4,
    name: 'Diana Lee',
    score: 600,
    prizesWon: [],
    lastActive: '2025-05-05T16:45:00Z'
  },
  {
    id: 5,
    name: 'Evan Davis',
    score: 1400,
    prizesWon: ['Gift Card'],
    lastActive: '2025-05-04T11:00:00Z'
  }
];
// Dummy data for quiz sessions and winners
const quizSessionsData = [
  {
    sessionNumber: 1,
    timestamp: '2025-05-01T10:00:00Z',
    winners: [
      { participantId: 1, prize: 'Gift Card' },
      { participantId: 3, prize: 'Tesla Model S' }
    ]
  },
  {
    sessionNumber: 2,
    timestamp: '2025-05-02T10:00:00Z',
    winners: [{ participantId: 2, prize: 'Headphones' }]
  },
  {
    sessionNumber: 3,
    timestamp: '2025-05-09T10:00:00Z',

    winners: []
  },
  {
    sessionNumber: 4,
    timestamp: '2025-05-03T10:00:00Z', // Current session (today, May 9, 2025)
    winners: [] // Winners not yet announced
  },
  {
    sessionNumber: 5,
    timestamp: '2025-05-03T10:00:00Z', // Current session (today, May 9, 2025)
    winners: [] // Winners not yet announced
  }
];

const ParticipantCountCard = () => {
  const [eligibleParticipants, setEligibleParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const eligibleCount = eligibleParticipants?.length || 0;
  const totalContestants = participantsData.length; // Dummy count for total contestants

  useEffect(() => {
    const fetchEligibleParticipants = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/mini_lottery/eligible');
        setEligibleParticipants(response.data.eligible_users || []);
      } catch (err) {
        setError(err.message || 'Failed to load eligible participants');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEligibleParticipants();
  }, []);

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <Card className='bg-card text-card-foreground shadow-md'>
        <CardHeader>
          <CardTitle className='text-lg'>
            Eligible Participants (Current Session)
          </CardTitle>
        </CardHeader>
        <CardContent className='text-foreground mx-auto flex h-5 items-center justify-center rounded-xl py-2 text-center text-3xl font-bold'>
          {isLoading ? (
            <div className='bg-muted h-8 w-12 animate-pulse rounded-lg'>
              <div className='via-foreground/10 animate-shimmer h-full w-full bg-gradient-to-r from-transparent to-transparent'></div>
            </div>
          ) : error ? (
            <span className='text-destructive'>{error}</span>
          ) : (
            eligibleCount
          )}
        </CardContent>
      </Card>
      <Card className='bg-card text-card-foreground shadow-md'>
        <CardHeader>
          <CardTitle className='text-lg'>
            Total Contestants (Current Session)
          </CardTitle>
        </CardHeader>
        <CardContent className='text-foreground mx-auto flex h-5 items-center justify-center rounded-xl py-2 text-center text-3xl font-bold'>
          {isLoading ? (
            <div className='bg-muted h-8 w-12 animate-pulse rounded-lg'>
              <div className='via-foreground/10 animate-shimmer h-full w-full bg-gradient-to-r from-transparent to-transparent'></div>
            </div>
          ) : error ? (
            <span className='text-destructive'>{error}</span>
          ) : (
            totalContestants
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// const ParticipantCountCard = () => {
//   const { data, isLoading, error } = useGetEligibleParticipantsQuery();
//   const eligibleCount = data?.eligible_users?.length || 0;
//   const totalContestants = participantsData.length; // Dummy count for total contestants

//   return (
//     <div className="flex flex-1 flex-col gap-4">
//       <Card className="bg-card text-card-foreground shadow-md">
//         <CardHeader>
//           <CardTitle className="text-lg">Eligible Participants (Current Session)</CardTitle>
//         </CardHeader>
//         <CardContent className="flex items-center justify-center text-center h-5 rounded-xl text-foreground mx-auto text-3xl font-bold py-2">
//           {isLoading ? (
//             <div className="w-12 h-8 bg-muted rounded-lg animate-pulse">
//               <div className="h-full w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
//             </div>
//           ) : error ? (
//             <span className="text-destructive">Error loading count</span>
//           ) : (
//             eligibleCount
//           )}
//         </CardContent>
//       </Card>
//       <Card className="bg-card text-card-foreground shadow-md">
//         <CardHeader>
//           <CardTitle className="text-lg">Total Contestants (Current Session)</CardTitle>
//         </CardHeader>
//         <CardContent className="flex items-center justify-center text-center h-5 rounded-xl text-foreground mx-auto text-3xl font-bold py-2">
//           {isLoading ? (
//             <div className="w-12 h-8 bg-muted rounded-lg animate-pulse">
//               <div className="h-full w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer"></div>
//             </div>
//           ) : error ? (
//             <span className="text-destructive">Error loading count</span>
//           ) : (
//             totalContestants
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

const CountdownCard = () => {
  const initialTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className='text-destructive'>Time's Up!</span>;
    } else {
      return (
        <span className='text-3xl font-bold'>
          {hours}:{minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </span>
      );
    }
  };

  return (
    <Card className='bg-card text-card-foreground flex-1 shadow-md'>
      <CardHeader>
        <CardTitle className='text-lg'>
          Time Remaining For The Next Award
        </CardTitle>
      </CardHeader>
      <CardContent className='bg-sidebar-accent text-foreground mx-auto flex h-32 items-center justify-center rounded-xl text-center text-3xl font-bold'>
        <Countdown date={initialTime} renderer={renderer} />
      </CardContent>
    </Card>
  );
};
const MiniPrizesCard = () => {
  // const { data: miniPrizesData, isLoading: isMiniLoading, error: miniError } = useGetMiniPrizesQuery();
  // const { data: grandPrizesData, isLoading: isGrandLoading, error: grandError } = useGetGrandPrizesQuery();
  const [miniPrizes, setMiniPrizes] = useState([]);
  const [grandPrizes, setGrandPrizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //   const prizes = [
  //     ...(miniPrizesData || []),
  //     ...(grandPrizesData || []),
  //   ].filter((prize) => prize); // Filter out undefined values in case of loading/error

  //   // const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
  // console.log("prizes", prizes);
  const prizes = [...(miniPrizes || []), ...(grandPrizes || [])].filter(
    (prize) => prize
  );

  useEffect(() => {
    const fetchPrizes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [miniPrizesResponse, grandPrizesResponse] = await Promise.all([
          axiosInstance.get('/miniprizes'),
          axiosInstance.get('/grandprizes')
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const onSelect = (emblaApi) => {
  //   setSelectedIndex(emblaApi.selectedScrollSnap());
  // };

  return (
    <Card className='bg-card text-card-foreground flex-1 shadow-md'>
      {isLoading ? (
        <CardContent className='flex h-64 justify-center py-1'>
          <div className='bg-muted h-full w-full animate-pulse rounded-lg'>
            <div className='via-foreground/10 animate-shimmer h-full w-full bg-gradient-to-r from-transparent to-transparent'></div>
          </div>
        </CardContent>
      ) : error ? (
        <CardContent className='py-1'>
          <p className='text-destructive text-center'>{error}</p>
        </CardContent>
      ) : prizes.length === 0 ? (
        <CardContent className='py-1'>
          <p className='text-muted-foreground text-center'>
            No prizes available
          </p>
        </CardContent>
      ) : (
        <>
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000
              })
            ]}
            className='w-full'
          >
            <CarouselContent>
              {prizes.map((prize, index) => (
                <CarouselItem key={index} className='md:basis-1/1'>
                  <CardHeader>
                    <CardTitle className='text-lg'>{prize?.name}</CardTitle>
                  </CardHeader>
                  <CardContent className='py-1'>
                    <div className='flex flex-col items-center'>
                      <div className='relative mb-4 h-32 w-32'>
                        <Image
                          src={prize?.image_url}
                          alt={prize?.name}
                          fill
                          className='rounded-lg object-cover shadow-md'
                        />
                      </div>
                      <p className='text-muted-foreground text-center text-sm'>
                        {prize.name}
                      </p>
                    </div>
                  </CardContent>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className='mt-2 flex justify-center space-x-2'>
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
export default function ParticipantsDashboardPage() {
  const [participants, setParticipants] = useState(participantsData);
  const [quizSessions] = useState(quizSessionsData);
  const handleRefresh = () => {
    // Simulate refreshing data (in a real app, this would fetch from an API)
    setParticipants([...participantsData]);
  };
  // Function to check if a session is the current session (today's date)
  const isCurrentSession = (timestamp) => {
    const sessionDate = new Date(timestamp).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0]; // May 9, 2025
    return sessionDate === today;
  };

  // Function to get participant name by ID
  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId);
    return participant ? participant.name : 'Unknown';
  };
  return (
    <div className='bg-background text-foreground min-h-screen p-4 md:p-8'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold md:text-3xl'>
          Participants Dashboard
        </h1>
        <Button
          variant='outline'
          onClick={handleRefresh}
          className='flex items-center gap-2'
        >
          <IconRefresh className='h-4 w-4' />
          <span>Refresh</span>
        </Button>
      </div>

      <div className='mb-6 flex flex-col gap-4 md:flex-row'>
        <ParticipantCountCard />

        <MiniPrizesCard />
        <CountdownCard />
      </div>

      <div className='hidden md:block'>
        <Card className='bg-card text-card-foreground shadow-lg'>
          <CardHeader>
            <CardTitle>Winners by Quiz Session</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {quizSessions.map((session) => (
                    <TableHead
                      key={session.sessionNumber}
                      className='text-center'
                    >
                      Session {session.sessionNumber}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {quizSessions.map((session) => (
                    <TableCell
                      key={session.sessionNumber}
                      className='align-top'
                    >
                      {isCurrentSession(session.timestamp) ? (
                        <p className='text-muted-foreground italic'>
                          Winners will be announced soon!
                        </p>
                      ) : session.winners.length === 0 ? (
                        <p className='text-muted-foreground'>
                          No winners for this session.
                        </p>
                      ) : (
                        <ul className='list-none space-y-2'>
                          {session.winners.map((winner, index) => (
                            <li key={index} className='flex items-center gap-2'>
                              <IconTrophy className='text-primary h-4 w-4' />
                              <span>
                                {getParticipantName(winner.participantId)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile View: Session Cards */}
      <div className='space-y-4 md:hidden'>
        {quizSessions.map((session) => (
          <Card
            key={session.sessionNumber}
            className='bg-card text-card-foreground shadow-md'
          >
            <CardContent className='pt-6'>
              <h3 className='mb-2 text-lg font-semibold'>
                Session {session.sessionNumber}
              </h3>
              {isCurrentSession(session.timestamp) ? (
                <p className='text-muted-foreground italic'>
                  Winners will be announced soon!
                </p>
              ) : session.winners.length === 0 ? (
                <p className='text-muted-foreground'>
                  No winners for this session.
                </p>
              ) : (
                <ul className='list-none space-y-2'>
                  {session.winners.map((winner, index) => (
                    <li key={index} className='flex items-center gap-2'>
                      <IconTrophy className='text-primary h-4 w-4' />
                      <span>{getParticipantName(winner?.participantId)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
