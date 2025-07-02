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
  { title: 'Pacientes', href: '/pacientes' },
  { title: 'Crear', href: '/pacientes/create' },
];

interface Habitacion {
  id: number;
  numero: string;
  costo_noche: string;
}

export default function CreatePaciente({ habitaciones }: { habitaciones: Habitacion[] }) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    habitacion_id: '',
    fecha_ingreso: '',
  });
  console.log("🚀 ~ CreatePaciente ~ data:", data)

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
                  <Label htmlFor="habitacion_id">Habitación <span className="text-red-500">*</span></Label>
                  <select
                    id="habitacion_id"
                    name="habitacion_id"
                    required
                    value={data.habitacion_id}
                    onChange={(e) => setData('habitacion_id', e.target.value)}
                    className="border rounded-md px-3 py-2"
                  >
                    <option value="">Selecciona una habitación</option>
                    {habitaciones.map((habitacion) => (
                      <option key={habitacion.id} value={habitacion.id}>
                        {habitacion.numero} — ${habitacion.costo_noche}
                      </option>
                    ))}
                  </select>
                  {errors.habitacion_id && <p className="text-sm text-red-500">{errors.habitacion_id}</p>}
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
