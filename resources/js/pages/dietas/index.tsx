import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowUp, EditIcon, PlusIcon } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dietas', href: '/dietas' },
];

interface Dieta {
  id: number;
  fecha: string;
  paciente: {
    id: number;
    nombre: string;
    habitacion: {
      numero: string;
      costo_noche: number;
    };
  };
  nutriologo: {
    id: number;
    nombre: string
  };
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

interface Filters {
  search?: string;
  sort?: string;
  direction?: string;
}

export default function Dietas({
  dietas,
  filters,
}: {
  dietas: DietasPagination;
  filters: Filters;
}) {
  const { data, setData } = useForm({
    search: filters?.search || '',
    sort: filters?.sort || 'fecha',
    direction: filters?.direction || 'desc',
  });

  // Búsqueda con debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/dietas', data, {
        preserveState: true,
        replace: true,
      });
    }, 300);
    return () => clearTimeout(delay);
  }, [data.search]);

  const handleSort = (key: 'paciente' | 'nutriologo' | 'fecha' | 'numero_habitacion') => {
    const isSameColumn = data.sort === key;
    const newDirection = isSameColumn && data.direction === 'asc' ? 'desc' : 'asc';

    setData((prev) => ({
      ...prev,
      sort: key,
      direction: newDirection,
    }));

    router.get('/dietas', {
      ...data,
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
      <Head title="Dietas" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold">Dietas</h1>
          <Link href="/dietas/create">
            <Button>
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
              <div className="flex gap-2">
                <Button variant="secondary" asChild>
                  <a href="/dietas/export/pdf" target="_blank" rel="noopener noreferrer">Exportar PDF</a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/dietas/export/excel">Exportar Excel</a>
                </Button>
              </div>
              <Input
                placeholder="Buscar paciente o nutriólogo..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Listado de dietas asignadas</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('paciente')}>
                      Paciente {getSortIcon('paciente')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('numero_habitacion')}>
                      Habitación {getSortIcon('numero_habitacion')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('fecha')}>
                      Fecha {getSortIcon('fecha')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('nutriologo')}>
                      Nutriólogo {getSortIcon('nutriologo')}
                    </TableHead>
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
                        <TableCell>{dieta.paciente.habitacion?.numero ?? '-'}</TableCell>
                        <TableCell>{dieta.fecha}</TableCell>
                        <TableCell>{dieta.nutriologo.nombre}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/dietas/${dieta.id}/edit`}>
                              <Button variant="outline" size="icon">
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
