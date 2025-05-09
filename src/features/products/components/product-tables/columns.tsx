'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef, Column } from '@tanstack/react-table';
import { CellAction } from './cell-action';

interface Question {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correct_answer: string;
  created_at: string;
  updated_at: string;
}

export const columns: ColumnDef<Question>[] = [
  {
    id: 'question',
    accessorKey: 'question',
    header: ({ column }: { column: Column<Question, unknown> }) => (
      <DataTableColumnHeader column={column} title='Question' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Question['question']>()}</div>,
    enableColumnFilter: true,
    meta: {
      label: 'Question',
      placeholder: 'Search questions...',
      variant: 'text',
    },
  },
  {
    id: 'option1',
    accessorKey: 'option1',
    header: ({ column }: { column: Column<Question, unknown> }) => (
      <DataTableColumnHeader column={column} title='Option 1' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Question['option1']>()}</div>,
  },
  {
    id: 'option2',
    accessorKey: 'option2',
    header: ({ column }: { column: Column<Question, unknown> }) => (
      <DataTableColumnHeader column={column} title='Option 2' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Question['option2']>()}</div>,
  },
  {
    id: 'option3',
    accessorKey: 'option3',
    header: ({ column }: { column: Column<Question, unknown> }) => (
      <DataTableColumnHeader column={column} title='Option 3' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Question['option3']>()}</div>,
  },
  {
    id: 'correct_answer',
    accessorKey: 'correct_answer',
    header: ({ column }: { column: Column<Question, unknown> }) => (
      <DataTableColumnHeader column={column} title='Correct Answer' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Question['correct_answer']>()}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row?.original||""} />,
  },
];