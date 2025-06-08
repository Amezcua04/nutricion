import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EditIcon, PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteButton from '@/components/delete-button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Nutriologos',
    href: '/nutriologos',
  },
];

interface Nutriologo {
  id: number;
  nombre: string;
  usuario: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface NutriologosPagination {
  data: Nutriologo[];
  links: PaginationLink[];
}

export default function Nutriologos({ nutriologos }: { nutriologos: NutriologosPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Nutriólogos" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Nutriólogos</h1>
          <Link href='/nutriologos/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Nutriólogo
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Nutriólogos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de nutriólogos registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nutriologos.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No hay nutriólogos registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    nutriologos.data.map((nutriologo) => (
                      <TableRow key={nutriologo.id}>
                        <TableCell className="font-medium">{nutriologo.id}</TableCell>
                        <TableCell>{nutriologo.nombre}</TableCell>
                        <TableCell>{nutriologo.usuario}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/nutriologos/${nutriologo.id}/edit`}>
                              <Button variant='outline' size='icon' className='cursor-pointer'>
                                <EditIcon className='w-4 h-4' />
                              </Button>
                            </Link>
                            <DeleteButton resourceName='nutriólogo' deleteUrl={`/nutriologos/${nutriologo.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={nutriologos.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}