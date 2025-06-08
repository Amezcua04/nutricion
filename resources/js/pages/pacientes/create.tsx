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
        title: 'Pacientes',
        href: '/pacientes',
    },
    {
        title: 'Crear',
        href: '/pacientes/create',
    },
];

export default function CreatePaciente() {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    numero_habitacion: '',
    fecha_ingreso: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/pacientes', {
      onSuccess: () => {
        toast.success('Paciente creado con éxito');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Paciente" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Crear Paciente</CardTitle>
              <Link href="/pacientes">
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
                  <Label htmlFor="nombre">Nombre completo <span className="text-red-500">*</span></Label>
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
                  <Label htmlFor="numero_habitacion">Habitación <span className="text-red-500">*</span></Label>
                  <Input
                    id="numero_habitacion"
                    name="numero_habitacion"
                    type="text"
                    required
                    value={data.numero_habitacion}
                    onChange={(e) => setData('numero_habitacion', e.target.value)}
                  />
                  {errors.numero_habitacion && <p className="text-sm text-red-500">{errors.numero_habitacion}</p>}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="fecha_ingreso">Fecha de ingreso <span className="text-red-500">*</span></Label>
                  <Input
                    id="fecha_ingreso"
                    name="fecha_ingreso"
                    type="date"
                    required
                    value={data.fecha_ingreso}
                    onChange={(e) => setData('fecha_ingreso', e.target.value)}
                  />
                  {errors.fecha_ingreso && <p className="text-sm text-red-500">{errors.fecha_ingreso}</p>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={processing} className="cursor-pointer">
                  {processing ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
