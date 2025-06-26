<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class DietasExport implements FromCollection, WithHeadings, WithStyles, WithColumnFormatting
{
    private $dietas;

    public function __construct($dietas)
    {
        $this->dietas = $dietas;
    }

    public function collection(): Collection
    {
        $rows = collect();

        foreach ($this->dietas as $dieta) {
            $agrupados = $dieta->detalle->groupBy(fn($d) => $d->tipoComida->nombre);

            foreach ($agrupados as $tipoNombre => $detalles) {
                $first = true;
                foreach ($detalles as $detalle) {
                    $subtotal = $detalle->cantidad * $detalle->insumo->costo_unitario;

                    $rows->push([
                        $first ? ($dieta->fecha) : '',
                        $first ? ($dieta->paciente->nombre) : '',
                        $first ? ($dieta->paciente->habitacion->numero ?? '—') : '',
                        $first ? ($dieta->nutriologo->nombre) : '',
                        $first ? $tipoNombre : '',
                        $detalle->insumo->nombre,
                        $detalle->cantidad,
                        $detalle->insumo->costo_unitario,
                        $subtotal,
                    ]);

                    $first = false;
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
            'Habitación',
            'Nutriólogo',
            'Tipo de comida',
            'Insumo',
            'Cantidad',
            'Costo Unitario',
            'Subtotal',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'G' => NumberFormat::FORMAT_NUMBER_00,
            'H' => NumberFormat::FORMAT_CURRENCY_USD_SIMPLE,
            'I' => NumberFormat::FORMAT_CURRENCY_USD_SIMPLE, 
        ];
    }
}
