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
    title: 'Dietas',
    href: '/dietas',
  },
];

interface Paciente {
  id: number;
  nombre: string;
}

interface Nutriologo {
  id: number;
  nombre: string;
}

interface Dieta {
  id: number;
  fecha: string;
  paciente: Paciente;
  nutriologo: Nutriologo;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface DietasPagination {
  data: Dieta[];
  links: PaginationLink[];
}

export default function Dietas({ dietas }: { dietas: DietasPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dietas" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold">Dietas</h1>
          <Link href="/dietas/create">
            <Button className="cursor-pointer">
              <PlusIcon className="w-4 h-4 mr-2" />
              Asignar Dieta
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Registro de Dietas</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Botones de exportación */}
            <div className="flex gap-2 mb-4">
              <Button variant="secondary" asChild>
                <a href="/dietas/export/pdf" target="_blank" rel="noopener noreferrer">
                  Exportar PDF
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/dietas/export/excel">
                  Exportar Excel
                </a>
              </Button>
            </div>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Listado de dietas asignadas</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nutriólogo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dietas.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No hay dietas registradas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    dietas.data.map((dieta) => (
                      <TableRow key={dieta.id}>
                        <TableCell className="font-medium">{dieta.id}</TableCell>
                        <TableCell>{dieta.paciente.nombre}</TableCell>
                        <TableCell>{dieta.fecha}</TableCell>
                        <TableCell>{dieta.nutriologo.nombre}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/dietas/${dieta.id}/edit`}>
                              <Button variant="outline" size="icon" className="cursor-pointer">
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName="dieta" deleteUrl={`/dietas/${dieta.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={dietas.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
