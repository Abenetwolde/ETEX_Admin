'use client';

import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { ProductTable } from './mini-prize-tables';
import { columns } from './mini-prize-tables/columns';
import { useGetMiniPrizesQuery } from '@/Apis/users';


type MiniPrizeListingPage = {};

export default function MiniPrizeListingPage({}: MiniPrizeListingPage) {
  const { data, isLoading, error } = useGetMiniPrizesQuery();

  if (isLoading) return <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />;
  if (error) return <div>Error fetching mini prizes</div>;

  const totalItems = data?.length || 0; // Assuming the API returns an array; update if pagination is supported

  return (
    <ProductTable
      data={data || []}
      totalItems={totalItems}
      columns={columns}
    />
  );
}