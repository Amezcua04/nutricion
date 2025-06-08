import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface DashboardProps {
  pacientes_activos: number;
  total_dietas_mes: number;
  inversion_total: number;
  grafica: { fecha: string; total: number }[];
  maximo: number
}

export default function Dashboard({
  pacientes_activos,
  total_dietas_mes,
  inversion_total,
  grafica,
  maximo
}: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes activos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pacientes_activos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dietas este mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{total_dietas_mes}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inversión total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${inversion_total}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle>Inversión por día</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grafica}>
                <XAxis dataKey="fecha" />
                <YAxis
                  domain={[0, maximo]}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />

                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                      maximumFractionDigits: 2,
                    }).format(value)
                  }
                />
                <Bar dataKey="total" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>


          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
