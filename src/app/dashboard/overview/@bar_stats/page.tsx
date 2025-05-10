import { delay } from '@/constants/mock-api';
import EligibilityTimeSeriesCard from '@/features/overview/components/bar-graph';
// import { EligibilityTimeSeriesCard } from '@/features/overview/components/bar-graph';

export default async function BarStats() {
  await await delay(1000);

  return <EligibilityTimeSeriesCard />;
}
