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
    title: 'Pacientes',
    href: '/pacientes',
  },
];

interface Paciente {
  id: number;
  nombre: string;
  numero_habitacion: string;
  fecha_ingreso: string;
  fecha_egreso?: string | null;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PacientesPagination {
  data: Paciente[];
  links: PaginationLink[];
}

export default function Pacientes({ pacientes }: { pacientes: PacientesPagination }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pacientes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <Link href="/pacientes/create">
            <Button className="cursor-pointer">
              <PlusIcon className="w-4 h-4 mr-2" />
              Agregar Paciente
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de pacientes registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Habitación</TableHead>
                    <TableHead>Ingreso</TableHead>
                    <TableHead>Egreso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pacientes.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No hay pacientes registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pacientes.data.map((paciente) => (
                      <TableRow key={paciente.id}>
                        <TableCell className="font-medium">{paciente.id}</TableCell>
                        <TableCell>{paciente.nombre}</TableCell>
                        <TableCell>{paciente.numero_habitacion}</TableCell>
                        <TableCell>{paciente.fecha_ingreso}</TableCell>
                        <TableCell>{paciente.fecha_egreso ?? '—'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/pacientes/${paciente.id}/edit`}>
                              <Button variant="outline" size="icon" className="cursor-pointer">
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName="paciente" deleteUrl={`/pacientes/${paciente.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={pacientes.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
