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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dietas',
        href: '/dietas',
    },
    {
        title: 'Crear',
        href: '/dietas/create',
    },
];

interface Option {
    id: number;
    nombre: string;
}

interface Props {
    pacientes: Option[];
    nutriologos: Option[];
}

export default function CreateDieta({ pacientes, nutriologos }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        paciente_id: '',
        fecha: '',
        nutriologo_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dietas', {
            onSuccess: () => toast.success('Dieta creada. Ahora asigna los alimentos.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Dieta" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Crear Dieta</CardTitle>
                            <Link href="/dietas">
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
                                {/* Paciente */}
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="paciente_id">Paciente <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={data.paciente_id}
                                        onValueChange={(value) => setData('paciente_id', value)}
                                    >
                                        <SelectTrigger id="paciente_id" className="cursor-pointer">
                                            <SelectValue placeholder="Selecciona un paciente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pacientes.map((p) => (
                                                <SelectItem key={p.id} value={String(p.id)}>
                                                    {p.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.paciente_id && <p className="text-sm text-red-500">{errors.paciente_id}</p>}
                                </div>

                                {/* Nutriólogo */}
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="nutriologo_id">Nutriólogo <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={data.nutriologo_id}
                                        onValueChange={(value) => setData('nutriologo_id', value)}
                                    >
                                        <SelectTrigger id="nutriologo_id" className="cursor-pointer">
                                            <SelectValue placeholder="Selecciona un nutriólogo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nutriologos.map((n) => (
                                                <SelectItem key={n.id} value={String(n.id)}>
                                                    {n.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.nutriologo_id && <p className="text-sm text-red-500">{errors.nutriologo_id}</p>}
                                </div>
                            </div>

                            {/* Fecha */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="fecha">Fecha <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="fecha"
                                        name="fecha"
                                        type="date"
                                        required
                                        value={data.fecha}
                                        onChange={(e) => setData('fecha', e.target.value)}
                                    />
                                    {errors.fecha && <p className="text-sm text-red-500">{errors.fecha}</p>}
                                </div>
                            </div>

                            {/* Botón */}
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="cursor-pointer">
                                    {processing ? 'Guardando...' : 'Guardar y continuar'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
