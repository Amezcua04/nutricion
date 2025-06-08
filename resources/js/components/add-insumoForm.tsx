import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { toast } from 'sonner';

interface Insumo {
  id: number;
  nombre: string;
}

interface Props {
  dietaId: number;
  tipoComidaId: number;
  insumos: Insumo[];
}

export default function AddInsumoForm({ dietaId, tipoComidaId, insumos }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    dieta_id: dietaId,
    tipo_comida_id: tipoComidaId,
    insumo_id: '',
    cantidad: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/detalleDieta', {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Insumo agregado');
        setData('insumo_id', '');
        setData('cantidad', '');
      },
      onError: () => {
        toast.error('Error al agregar el insumo');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mt-4 items-end">
      <div className="flex-1 space-y-1">
        <Label htmlFor="insumo_id">Insumo</Label>
        <Select
          value={data.insumo_id}
          onValueChange={(val) => setData('insumo_id', val)}
        >
          <SelectTrigger id="insumo_id" className="cursor-pointer">
            <SelectValue placeholder="Selecciona un insumo" />
          </SelectTrigger>
          <SelectContent>
            {insumos.map((insumo) => (
              <SelectItem key={insumo.id} value={String(insumo.id)}>
                {insumo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.insumo_id && <p className="text-sm text-red-500">{errors.insumo_id}</p>}
      </div>

      <div className="w-32 space-y-1">
        <Label htmlFor="cantidad">Cantidad</Label>
        <Input
          type="number"
          step="0.10"
          min="0"
          value={data.cantidad}
          onChange={(e) => setData('cantidad', e.target.value)}
          placeholder="Ej: 1.5"
        />
        {errors.cantidad && <p className="text-sm text-red-500">{errors.cantidad}</p>}
      </div>

      <Button type="submit" disabled={processing} className='cursor-pointer'>
        {processing ? 'Agregando...' : 'Agregar'}
      </Button>
    </form>
  );
}
