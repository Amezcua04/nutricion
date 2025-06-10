import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import AddInsumoForm from '@/components/add-insumoForm';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dietas', href: '/dietas' },
  { title: 'Editar', href: '/dietas/edit' },
];

interface Insumo {
  id: number;
  nombre: string;
  unidad: string;
}

interface TipoComida {
  id: number;
  nombre: string;
}

interface Detalle {
  id: number;
  tipo_comida: TipoComida;
  insumo: Insumo;
  cantidad: number;
}

interface Dieta {
  id: number;
  fecha: string;
  paciente: { id: number; nombre: string };
  nutriologo: { id: number; nombre: string };
  detalle: Detalle[];
}

interface CostoPorTipo {
  id: number;
  nombre: string;
  total: number;
}

interface Props {
  dieta: Dieta;
  insumos: Insumo[];
  tiposComida: TipoComida[];
  costosPorTipo: CostoPorTipo[];
}

export default function EditDieta({ dieta, insumos, tiposComida, costosPorTipo }: Props) {
  const agrupadoPorId: Record<number, Detalle[]> = dieta.detalle.reduce((acc, d) => {
    const tipoId = d.tipo_comida.id;
    if (!acc[tipoId]) acc[tipoId] = [];
    acc[tipoId].push(d);
    return acc;
  }, {} as Record<number, Detalle[]>);

  const handleDelete = (id: number) => {
    router.delete(`/detalleDieta/${id}`, {
      preserveScroll: true,
      onSuccess: () => router.reload({ only: ['dieta', 'costosPorTipo'] })
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Asignar Dieta" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Asignar alimentos</h1>
          <Link href="/dietas">
            <Button variant="outline" className="cursor-pointer">
              <ArrowLeftIcon className="w-4 h-4" />
              Regresar
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Dieta</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Paciente:</strong> {dieta.paciente.nombre}</p>
            <p><strong>Nutriólogo:</strong> {dieta.nutriologo.nombre}</p>
            <p><strong>Fecha:</strong> {dieta.fecha}</p>
          </CardContent>
        </Card>

        {tiposComida.map((tipo) => {
          const detalles = agrupadoPorId[tipo.id] ?? [];
          const costo = costosPorTipo.find((c) => c.id === tipo.id)?.total ?? 0;

          return (
            <Card key={tipo.id}>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <CardTitle>
                    {tipo.nombre} <span className="text-sm text-muted-foreground font-normal">(${costo} MXN)</span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {detalles.length === 0 ? (
                  <p className="text-gray-500">Sin insumos asignados.</p>
                ) : (
                  <ul className="space-y-2 mb-4">
                    {detalles.map((detalle) => (
                      <li
                        key={detalle.id}
                        className="flex justify-between items-center border p-2 rounded-md"
                      >
                        <div>
                          {detalle.insumo.nombre} ({detalle.cantidad} {detalle.insumo.unidad})
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => handleDelete(detalle.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}

                <AddInsumoForm
                  dietaId={dieta.id}
                  tipoComidaId={tipo.id}
                  insumos={insumos}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
