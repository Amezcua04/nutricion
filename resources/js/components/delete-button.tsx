import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

interface DeleteButtonProps {
  resourceName: string;
  deleteUrl: string;
  onSuccess?: () => void;
}

export default function DeleteButton({ resourceName, deleteUrl, onSuccess }: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='icon' className='cursor-pointer'>
          <TrashIcon className='w-4 h-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este {resourceName}?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className='cursor-pointer bg-red-500 hover:bg-red-600 text-white'
            onClick={() => {
              router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                  toast.success(`${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} eliminado con éxito`);
                  onSuccess?.();
                },
              });
            }}
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
