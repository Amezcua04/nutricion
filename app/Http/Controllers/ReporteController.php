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

        return $pdf->stream('reporte_inversion.pdf');
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
            ->join('habitaciones', 'habitaciones.id', '=', 'pacientes.habitacion_id')
            ->join('dietas', 'dietas.paciente_id', '=', 'pacientes.id')
            ->join('detalle_dietas', 'detalle_dietas.dieta_id', '=', 'dietas.id')
            ->join('insumos', 'insumos.id', '=', 'detalle_dietas.insumo_id')
            ->select(
                'pacientes.nombre',
                'habitaciones.numero as habitacion',
                'habitaciones.costo_noche as costo',
                DB::raw("
            CASE
                WHEN DATEDIFF(pacientes.fecha_egreso, pacientes.fecha_ingreso) = 0 THEN 1
                ELSE DATEDIFF(pacientes.fecha_egreso, pacientes.fecha_ingreso)
            END as estancia
        "),
                DB::raw("
            TRUNCATE(
                habitaciones.costo_noche *
                CASE
                    WHEN DATEDIFF(pacientes.fecha_egreso, pacientes.fecha_ingreso) = 0 THEN 1
                    ELSE DATEDIFF(pacientes.fecha_egreso, pacientes.fecha_ingreso)
                END
            , 2) as costo_estancia
        "),
                DB::raw("
                TRUNCATE(
                SUM(insumos.costo_unitario * detalle_dietas.cantidad)
                , 2)  as total_alimentos"),
                DB::raw("
            TRUNCATE(
                (habitaciones.costo_noche *
                    CASE
                        WHEN DATEDIFF(pacientes.fecha_egreso, pacientes.fecha_ingreso) = 0 THEN 1
                        ELSE DATEDIFF(pacientes.fecha_egreso, pacientes.fecha_ingreso)
                    END
                ) - SUM(insumos.costo_unitario * detalle_dietas.cantidad)
            , 2) as diferencia
        ")
            )
            ->whereBetween('dietas.fecha', [$fechaInicio, $fechaFin])
            ->groupBy(
                'pacientes.nombre',
                'habitaciones.numero',
                'habitaciones.costo_noche',
                'pacientes.fecha_egreso',
                'pacientes.fecha_ingreso'
            )
            ->orderBy('pacientes.nombre')
            ->get();
    }
}
