import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

interface ReporteItem {
  id: number;
  nombre: string;
  tipo: string;
  habitacion: string;
  costo: number;
  estancia: number;
  costo_estancia: number;
  total_alimentos: number;
  diferencia: number;
}

interface Props {
  reporte: ReporteItem[];
  fecha_inicio: string;
  fecha_fin: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Reportes',
    href: '/reportes',
  },
];

export default function ReportesIndex({ reporte, fecha_inicio, fecha_fin }: Props) {
  const [fInicio, setFInicio] = useState(fecha_inicio);
  const [fFin, setFFin] = useState(fecha_fin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/reportes', { fecha_inicio: fInicio, fecha_fin: fFin });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reportes de Inversión" />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reportes de Inversión por Paciente</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtrar por Fecha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap items-end">
              <div className="space-y-1">
                <label htmlFor="fecha_inicio">Desde</label>
                <Input
                  type="date"
                  id="fecha_inicio"
                  value={fInicio}
                  onChange={(e) => setFInicio(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="fecha_fin">Hasta</label>
                <Input
                  type="date"
                  id="fecha_fin"
                  value={fFin}
                  onChange={(e) => setFFin(e.target.value)}
                />
              </div>
              <Button type="submit">Filtrar</Button>
            </form>

            {/* Botones de exportación */}
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" asChild>
                <a
                  href={`/reportes/export/pdf?fecha_inicio=${fInicio}&fecha_fin=${fFin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Exportar PDF
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a
                  href={`/reportes/export/excel?fecha_inicio=${fInicio}&fecha_fin=${fFin}`}
                >
                  Exportar Excel
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Paciente</th>
                    <th className="p-2">Tipo Estancia</th>
                    <th className="p-2">Habitación</th>
                    <th className="p-2">Costo</th>
                    <th className="p-2">Estancia</th>
                    <th className="p-2">Costo Estancia</th>
                    <th className="p-2">Total Alimentos</th>
                    <th className="p-2">Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reporte.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6">
                        No hay datos para mostrar.
                      </td>
                    </tr>
                  ) : (
                    reporte.map((r) => (
                      <tr key={r.id} className="border-b">
                        <td className="p-2 font-medium">{r.nombre}</td>
                        <td className="p-2 font-medium">{r.tipo}</td>
                        <td className="p-2">{r.habitacion}</td>
                        <td className="p-2">$ {r.costo}</td>
                        <td className="p-2">{r.estancia} {r.estancia > 1 ? 'días' : 'día'}</td>
                        <td className="p-2">$ {r.costo_estancia}</td>
                        <td className="p-2">$ {r.total_alimentos}</td>
                        <td className="p-2">$ {r.diferencia}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
