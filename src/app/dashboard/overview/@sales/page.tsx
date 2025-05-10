import { delay } from '@/constants/mock-api';
import RecentWinners from '@/features/overview/components/recent-sales';
// import { RecentSales } from '@/features/overview/components/recent-sales';


export default async function Sales() {
  await delay(3000);
  return <RecentWinners />;
}
