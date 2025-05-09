'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef, Column } from '@tanstack/react-table';

import Image from 'next/image';
import { CellAction } from './cell-action';

interface MiniPrize {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock: number;
}

export const columns: ColumnDef<MiniPrize>[] = [
  {
    accessorKey: 'image_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative w-10 h-10'>
          <Image
            src={row.getValue('image_url')||"https://icon-library.com/images/prizes-icon/prizes-icon-2.jpg"}
            alt={row.getValue('name')}
            fill
            className='rounded-lg object-cover'
          />
        </div>
      );
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<MiniPrize, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<MiniPrize['name']>()}</div>,
    enableColumnFilter: true,
    meta: {
      label: 'Name',
      placeholder: 'Search mini prizes...',
      variant: 'text',
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }: { column: Column<MiniPrize, unknown> }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<MiniPrize['description']>()}</div>,
  },
  {
    id: 'stock',
    accessorKey: 'stock',
    header: ({ column }: { column: Column<MiniPrize, unknown> }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<MiniPrize['stock']>()}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];