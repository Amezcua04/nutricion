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
    title: 'Tipos de Comidas',
    href: '/tiposComida',
  },
];

interface TipoComida {
  id: number;
  nombre: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface TiposPagination {
  data: TipoComida[];
  links: PaginationLink[];
}

export default function TiposComida({ tipos }: { tipos: TiposPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tipos de Comida" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold">Tipos de Comida</h1>
          <Link href="/tiposComida/create">
            <Button className="cursor-pointer">
              <PlusIcon className="w-4 h-4 mr-2" />
              Agregar Tipo
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tipos de Comida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Tipos de comida registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tipos.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        No hay tipos de comida registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tipos.data.map((tipo) => (
                      <TableRow key={tipo.id}>
                        <TableCell className="font-medium">{tipo.id}</TableCell>
                        <TableCell>{tipo.nombre}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/tiposComida/${tipo.id}/edit`}>
                              <Button variant="outline" size="icon" className="cursor-pointer">
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName="tipo de comida" deleteUrl={`/tiposComida/${tipo.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={tipos.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
