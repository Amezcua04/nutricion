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
                $item->desde,
                $item->hasta,
                $item->total_dietas,
                number_format($item->total_inversion, 2),
            ];
        });
    }

    public function headings(): array
    {
        return ['Paciente', 'Desde', 'Hasta', 'N° Dietas', 'Total Inversión (MXN)'];
    }
}

