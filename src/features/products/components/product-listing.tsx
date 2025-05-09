"use client";
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
// import { Product } from '@/constants/data';
// import { fakeProducts } from '@/constants/mock-api';
// import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';
import { useGetQuestionsQuery } from '@/Apis/users';

type ProductListingPage = {};

export default  function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('name');
  // const pageLimit = searchParamsCache.get('perPage');
  // const categories = searchParamsCache.get('category');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };

  const { data, isLoading, error } =  useGetQuestionsQuery();

  if (isLoading) return <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
  if (error) return <div>Error fetching questions</div>;
  const totalProducts = data?.length; // Assuming the API returns the total count of products
console.log('data.....', data);

  return (
    <ProductTable
      data={data}
      totalItems={totalProducts}
      columns={columns}
    />
  );
}
