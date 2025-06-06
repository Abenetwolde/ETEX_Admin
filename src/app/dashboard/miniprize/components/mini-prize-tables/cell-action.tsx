'use client';

import { useDeleteMiniPrizeMutation } from '@/Apis/users';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconEdit, IconTrash, IconDotsVertical } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';


interface MiniPrize {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock: number;
}

interface CellActionProps {
  data: MiniPrize;
}

export function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleteMiniPrize, { isLoading }] = useDeleteMiniPrizeMutation();

  const onConfirm = async () => {
    const loadingToast = toast.loading('Deleting mini prize...');
    try {
      await deleteMiniPrize(data.id).unwrap();
      toast.dismiss(loadingToast);
      toast.success('Mini prize deleted successfully!');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to delete mini prize. Please try again.');
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/miniprize/edit/${data.id}`)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' />
            {isLoading ? 'Deleting...' : 'Delete'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}