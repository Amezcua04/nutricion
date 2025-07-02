<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InversionExport implements FromCollection, WithHeadings
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        return collect($this->data)->map(function ($item) {
            return [
                $item->nombre,
                $item->habitacion,
                $item->costo,
                $item->estancia,
                $item->costo_estancia,
                $item->total_alimentos,
                $item->diferencia
            ];
        });
    }

    public function headings(): array
    {
        return ['Paciente', 'Habitación', 'Costo', 'Estancia', 'Costo Estancia', 'Total Alimentos', 'Diferencia'];
    }
}

