'use client';
import { useDeleteQuestionMutation } from '@/Apis/users';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Product } from '@/constants/data';
import { IconEdit, IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();


  const onConfirm = async () => {
    const loadingToast = toast.loading('Deleting question...');
    try {
      await deleteQuestion(data.id).unwrap();
      toast.dismiss(loadingToast);
      toast.success('Question deleted successfully!');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to delete question. Please try again.');
    }
  };;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
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
            onClick={() => router.push(`/dashboard/question/edit/${data.id}`)}
          >
            <IconEdit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} >
          <IconTrash className="h-4 w-4 mr-2" />
          {isLoading ? 'Deleting...' : 'Delete'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
