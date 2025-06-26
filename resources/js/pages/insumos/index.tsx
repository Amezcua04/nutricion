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
  { title: 'Insumos', href: '/insumos' },
];

interface Insumo {
  id: number;
  nombre: string;
  unidad: string;
  costo_unitario: number;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface InsumosPagination {
  data: Insumo[];
  links: PaginationLink[];
}

interface Filters {
  search?: string;
  sort?: string;
  direction?: string;
}

export default function Insumos({
  insumos,
  filters,
}: {
  insumos: InsumosPagination;
  filters: Filters;
}) {
  const { data, setData } = useForm({
    search: filters?.search || '',
    sort: filters?.sort || 'created_at',
    direction: filters?.direction || 'desc',
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/insumos', data, {
        preserveState: true,
        replace: true,
      });
    }, 300);
    return () => clearTimeout(delay);
  }, [data.search]);

  const handleSort = (key: keyof Insumo) => {
    const isSame = data.sort === key;
    const newDirection = isSame && data.direction === 'asc' ? 'desc' : 'asc';

    setData((prev) => ({
      ...prev,
      sort: key,
      direction: newDirection,
    }));

    router.get('/insumos', {
      ...data,
      sort: key,
      direction: newDirection,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const getSortIcon = (key: keyof Insumo) => {
    if (filters?.sort !== key) return null;
    return filters?.direction === 'asc' ? (
      <ArrowUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1" />
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Insumos" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold">Insumos</h1>
          <Link href="/insumos/create">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Agregar Insumo
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Insumos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Input
                placeholder="Buscar por nombre o unidad..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de insumos registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('nombre')}>
                      Nombre {getSortIcon('nombre')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('unidad')}>
                      Unidad {getSortIcon('unidad')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('costo_unitario')}>
                      Costo Unitario {getSortIcon('costo_unitario')}
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insumos.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No hay insumos registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    insumos.data.map((insumo) => (
                      <TableRow key={insumo.id}>
                        <TableCell className="font-medium">{insumo.id}</TableCell>
                        <TableCell>{insumo.nombre}</TableCell>
                        <TableCell>{insumo.unidad}</TableCell>
                        <TableCell>${insumo.costo_unitario}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end flex-wrap">
                            <Link href={`/insumos/${insumo.id}/edit`}>
                              <Button variant="outline" size="icon">
                                <EditIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteButton resourceName="insumo" deleteUrl={`/insumos/${insumo.id}`} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={insumos.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}