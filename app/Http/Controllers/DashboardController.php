<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Models\Dieta;
use App\Models\DetalleDieta;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Pacientes hospitalizados activos
        $pacientes_activos = Paciente::where('fecha_egreso', null)->count();

        // 2. Dietas asignadas este mes
        $inicioMes = Carbon::now()->startOfMonth()->toDateString();
        $finMes = Carbon::now()->endOfMonth()->toDateString();

        $dietas_mes = Dieta::whereBetween('fecha', [$inicioMes, $finMes])->get();
        $total_dietas_mes = $dietas_mes->count();

        // 3. Inversión total del mes
        $ids = $dietas_mes->pluck('id');

        $inversion_total = DetalleDieta::whereIn('dieta_id', $ids)
            ->join('insumos', 'detalle_dietas.insumo_id', '=', 'insumos.id')
            ->select(DB::raw('SUM(detalle_dietas.cantidad * insumos.costo_unitario) as total'))
            ->value('total') ?? 0;

        // 4. Gráfica: inversión diaria (últimos 10 días del mes actual)
        $grafica = DetalleDieta::whereIn('dieta_id', $ids)
            ->join('dietas', 'detalle_dietas.dieta_id', '=', 'dietas.id')
            ->join('insumos', 'detalle_dietas.insumo_id', '=', 'insumos.id')
            ->select(
                'dietas.fecha',
                DB::raw('SUM(detalle_dietas.cantidad * insumos.costo_unitario) as total')
            )
            ->groupBy('dietas.fecha')
            ->orderBy('dietas.fecha')
            ->limit(10)
            ->get();
        $maximo = $grafica->max('total');

        return Inertia::render('dashboard', [
            'pacientes_activos' => $pacientes_activos,
            'total_dietas_mes' => $total_dietas_mes,
            'inversion_total' => round($inversion_total, 2),
            'grafica' => $grafica,
            'maximo' => round($maximo, 2)
        ]);
    }
}
