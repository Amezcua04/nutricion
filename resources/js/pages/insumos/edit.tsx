import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Insumos',
        href: '/insumos',
    },
    {
        title: 'Editar',
        href: '/insumos/edit',
    },
];

interface Insumo {
  id: number;
  nombre: string;
  unidad: string;
  costo_unitario: number;
}

export default function EditInsumo({ insumo }: { insumo: Insumo }) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: insumo.nombre,
    unidad: insumo.unidad,
    costo_unitario: insumo.costo_unitario.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/insumos/${insumo.id}`, {
      onSuccess: () => {
        toast.success('Insumo actualizado con éxito');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Insumo" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Editar Insumo</CardTitle>
              <Link href="/insumos">
                <Button className="cursor-pointer" variant="outline">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Regresar
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="nombre">Nombre <span className="text-red-500">*</span></Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                  />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                </div>
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="unidad">Unidad <span className="text-red-500">*</span></Label>
                  <Input
                    id="unidad"
                    name="unidad"
                    type="text"
                    required
                    value={data.unidad}
                    onChange={(e) => setData('unidad', e.target.value)}
                  />
                  {errors.unidad && <p className="text-sm text-red-500">{errors.unidad}</p>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="costo_unitario">Costo Unitario <span className="text-red-500">*</span></Label>
                  <Input
                    id="costo_unitario"
                    name="costo_unitario"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={data.costo_unitario}
                    onChange={(e) => setData('costo_unitario', e.target.value)}
                  />
                  {errors.costo_unitario && <p className="text-sm text-red-500">{errors.costo_unitario}</p>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={processing} className="cursor-pointer">
                  {processing ? 'Guardando...' : 'Actualizar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
