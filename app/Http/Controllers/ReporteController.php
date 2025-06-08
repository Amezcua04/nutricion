<?php

namespace App\Http\Controllers;

use App\Models\Dieta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\InversionExport;

class ReporteController extends Controller
{
    public function index(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', now()->endOfMonth()->toDateString());

        $reporte = $this->getReporteData($fechaInicio, $fechaFin);

        return Inertia::render('reportes/index', [
            'reporte' => $reporte,
            'fecha_inicio' => $fechaInicio,
            'fecha_fin' => $fechaFin,
        ]);
    }

    public function exportPdf(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', now()->endOfMonth()->toDateString());

        $reporte = $this->getReporteData($fechaInicio, $fechaFin);

        $pdf = Pdf::loadView('reportes.pdf', [
            'reporte' => $reporte,
            'fecha_inicio' => $fechaInicio,
            'fecha_fin' => $fechaFin,
        ]);

        return $pdf->download('reporte_inversion.pdf');
    }

    public function exportExcel(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', now()->endOfMonth()->toDateString());

        $reporte = $this->getReporteData($fechaInicio, $fechaFin);

        return Excel::download(new InversionExport($reporte), 'reporte_inversion.xlsx');
    }

    private function getReporteData($fechaInicio, $fechaFin)
    {
        return DB::table('pacientes')
            ->join('dietas', 'dietas.paciente_id', '=', 'pacientes.id')
            ->join('detalle_dietas', 'detalle_dietas.dieta_id', '=', 'dietas.id')
            ->join('insumos', 'detalle_dietas.insumo_id', '=', 'insumos.id')
            ->select(
                'pacientes.nombre',
                DB::raw('COUNT(DISTINCT dietas.id) as total_dietas'),
                DB::raw('SUM(insumos.costo_unitario * detalle_dietas.cantidad) as total_inversion'),
                DB::raw('MIN(dietas.fecha) as desde'),
                DB::raw('MAX(dietas.fecha) as hasta')
            )
            ->whereBetween('dietas.fecha', [$fechaInicio, $fechaFin])
            ->groupBy('pacientes.nombre')
            ->orderBy('pacientes.nombre')
            ->get();
    }
}