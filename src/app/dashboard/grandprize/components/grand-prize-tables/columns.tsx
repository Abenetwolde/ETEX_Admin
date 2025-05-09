'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef, Column } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Image from 'next/image';

interface GrandPrize {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock: number;
  grandness: boolean;
  created_at: string;
  updated_at: string;
}

export const columns: ColumnDef<GrandPrize>[] = [
  {
    accessorKey: 'image_url',
    header: 'IMAGE',
    cell: ({ row }) => (
      <div className='relative w-24 h-16'>
        <Image
          src={row.getValue('image_url')}
          alt={row.getValue('name')}
          fill
          className='rounded-lg object-cover'
        />
      </div>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<GrandPrize, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<GrandPrize['name']>()}</div>,
    enableColumnFilter: true,
    meta: {
      label: 'Name',
      placeholder: 'Search grand prizes...',
      variant: 'text',
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }: { column: Column<GrandPrize, unknown> }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<GrandPrize['description']>()}</div>,
  },
  {
    id: 'stock',
    accessorKey: 'stock',
    header: ({ column }: { column: Column<GrandPrize, unknown> }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<GrandPrize['stock']>()}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];