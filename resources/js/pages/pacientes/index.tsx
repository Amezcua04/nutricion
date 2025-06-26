import { useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ArrowDown, ArrowUp, EditIcon, PlusIcon } from 'lucide-react';
import DeleteButton from '@/components/delete-button';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Pacientes', href: '/pacientes' },
];

interface Habitacion {
  id: number;
  numero: string;
  costo_noche: string;
}

interface Paciente {
  id: number;
  nombre: string;
  habitacion: Habitacion;
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

interface Filters {
  search?: string;
  sort?: string;
  direction?: string;
}

export default function Pacientes({
  pacientes,
  filters,
}: {
  pacientes: PacientesPagination;
  filters: Filters;
}) {
  const { data, setData } = useForm({
    search: filters?.search || '',
    sort: filters?.sort || 'created_at',
    direction: filters?.direction || 'desc',
  });

  // Filtro con debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/pacientes', {
        search: data.search,
        sort: data.sort,
        direction: data.direction,
      }, {
        preserveState: true,
        replace: true,
      });
    }, 300);

    return () => clearTimeout(delay);
  }, [data.search]);


  const handleSort = (key: keyof Paciente) => {
    const isSameColumn = data.sort === key;
    const newDirection = isSameColumn && data.direction === 'asc' ? 'desc' : 'asc';

    setData((prev) => ({
      ...prev,
      sort: key,
      direction: newDirection,
    }));

    router.get('/pacientes', {
      search: data.search,
      sort: key,
      direction: newDirection,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const getSortIcon = (key: string) => {
    if (filters?.sort !== key) return null;
    return filters?.direction === 'asc' ? (
      <ArrowUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1" />
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pacientes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <Link href="/pacientes/create">
            <Button className='cursor-pointer'>
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
              <Input
                placeholder="Buscar por nombre o habitación..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de pacientes registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('nombre')}>
                      Nombre {getSortIcon('nombre')}
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('habitacion')}>
                      Habitación {getSortIcon('habitacion')}
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('fecha_ingreso')}>
                      Ingreso {getSortIcon('fecha_ingreso')}
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('fecha_egreso')}>
                      Egreso {getSortIcon('fecha_egreso')}
                    </TableHead>
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
                        {/* <TableCell>{paciente.habitacion?.numero} - ${paciente.habitacion?.costo_noche}</TableCell> */}
                        <TableCell>{paciente.habitacion?.numero}</TableCell>
                        <TableCell>{paciente.fecha_ingreso}</TableCell>
                        <TableCell>{paciente.fecha_egreso ?? '—'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/pacientes/${paciente.id}/edit`}>
                              <Button variant="outline" size="icon" className='cursor-pointer'>
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
