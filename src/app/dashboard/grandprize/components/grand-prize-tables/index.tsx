'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

interface ProductTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}

export function ProductTable<TData, TValue>({
  data,
  totalItems,
  columns,
}: ProductTableParams<TData, TValue>) {
  const [pageSize, setPageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [pageIndex, setPageIndex] = useQueryState('page', parseAsInteger.withDefault(1));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    shallow: false,
    debounceMs: 500,
    initialState: {
      pagination: {
        pageIndex: pageIndex - 1,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState = updater(table.getState().pagination);
      setPageIndex(newState.pageIndex + 1);
      setPageSize(newState.pageSize);
    },
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}