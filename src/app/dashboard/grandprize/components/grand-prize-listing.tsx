'use client';

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { ProductTable } from './grand-prize-tables';
import { columns } from './grand-prize-tables/columns';
import { useGetGrandPrizesQuery } from '@/Apis/users';

type GrandPrizeListingPage = {};

export default function GrandPrizeListingPage({}: GrandPrizeListingPage) {
  const { data, isLoading, error } = useGetGrandPrizesQuery();

  if (isLoading) return <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />;
  if (error) return <div>Error fetching grand prizes</div>;

  const totalItems = data?.length || 0; // Assuming the API returns an array; update if pagination is supported

  return (
    <ProductTable
      data={data || []}
      totalItems={totalItems}
      columns={columns}
    />
  );
}