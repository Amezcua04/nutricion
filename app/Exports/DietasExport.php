<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class DietasExport implements FromCollection, WithHeadings
{
    private $dietas;
    private $fileName = 'dietas.xlsx';

    public function __construct($dietas)
    {
        $this->dietas = $dietas;
    }

    public function collection(): Collection
    {
        $rows = collect();

        foreach ($this->dietas as $dieta) {
            // Agrupar los detalles por tipo de comida
            $agrupados = $dieta->detalle->groupBy(fn($d) => $d->tipoComida->nombre);

            foreach ($agrupados as $tipoNombre => $detalles) {
                $first = true;
                foreach ($detalles as $detalle) {
                    $subtotal = $detalle->cantidad * $detalle->insumo->costo_unitario;

                    $rows->push([
                        'Fecha' => $dieta->fecha,
                        'Paciente' => $dieta->paciente->nombre,
                        'Nutriólogo' => $dieta->nutriologo->nombre,
                        'Tipo de comida' => $first ? $tipoNombre : '', // Solo en la primera fila
                        'Insumo' => $detalle->insumo->nombre,
                        'Cantidad' => $detalle->cantidad,
                        'Unidad' => $detalle->insumo->unidad,
                        'Costo Unitario' => number_format($detalle->insumo->costo_unitario, 2),
                        'Subtotal' => number_format($subtotal, 2),
                    ]);

                    $first = false; // Las siguientes filas no repiten el nombre del tipo
                }
            }
        }

        return $rows;
    }


    public function headings(): array
    {
        return [
            'Fecha',
            'Paciente',
            'Nutriólogo',
            'Tipo de comida',
            'Insumo',
            'Cantidad',
            'Unidad',
            'Costo Unitario',
            'Subtotal',
        ];
    }
}
