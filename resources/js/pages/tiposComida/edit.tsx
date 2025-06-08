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
        title: 'Tipos de Comida',
        href: '/tiposComida',
    },
    {
        title: 'Editar',
        href: '/tiposComida/edit',
    },
];

interface TipoComida {
  id: number;
  nombre: string;
}

export default function EditTipoComida({ tipo }: { tipo: TipoComida }) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: tipo.nombre,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/tiposComida/${tipo.id}`, {
      onSuccess: () => {
        toast.success('Tipo de comida actualizado con éxito');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Tipo de Comida" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Editar Tipo de Comida</CardTitle>
              <Link href="/tiposComida">
                <Button className="cursor-pointer" variant="outline">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Regresar
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
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
