<?php

namespace App\Http\Controllers;

use App\Exports\DietasExport;
use App\Models\Dieta;
use App\Models\Insumo;
use App\Models\Nutriologo;
use App\Models\Paciente;
use App\Models\TiposComida;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class DietaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'fecha');
        $direction = $request->input('direction', 'desc');

        $dietas = Dieta::with(['paciente.habitacion', 'nutriologo'])
            ->when($search, function ($query, $search) {
                $query->whereHas('paciente', function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%");
                })->orWhereHas('nutriologo', function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%");
                });
            })
            ->when(in_array($sort, ['fecha']), fn($q) => $q->orderBy($sort, $direction))
            ->when(
                $sort === 'paciente',
                fn($q) =>
                $q->join('pacientes', 'dietas.paciente_id', '=', 'pacientes.id')
                    ->orderBy('pacientes.nombre', $direction)
                    ->select('dietas.*')
            )
            ->when(
                $sort === 'nutriologo',
                fn($q) =>
                $q->join('nutriologos', 'dietas.nutriologo_id', '=', 'nutriologos.id')
                    ->orderBy('nutriologos.nombre', $direction)
                    ->select('dietas.*')
            )
            ->when(
                $sort === 'numero_habitacion',
                fn($q) =>
                $q->join('pacientes', 'dietas.paciente_id', '=', 'pacientes.id')
                    ->join('habitaciones', 'pacientes.habitacion_id', '=', 'habitaciones.id')
                    ->orderBy('habitaciones.numero', $direction)
                    ->select('dietas.*')
            )
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('dietas/index', [
            'dietas' => $dietas,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dietas/create', [
            'pacientes' => Paciente::select('id', 'nombre', 'created_at')
            ->orderBy('created_at', 'desc',)
            ->get(),
            'nutriologos' => Nutriologo::select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'nutriologo_id' => 'required|exists:nutriologos,id',
        ]);

        $dieta = Dieta::create($validated);

        return redirect()->route('dietas.edit', $dieta->id)->with('success', 'Dieta creada. Ahora asigna los alimentos.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dieta $dieta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dieta $dieta)
    {
        $dieta->load(['paciente', 'nutriologo', 'detalle.tipoComida', 'detalle.insumo']);

        $tiposComida = TiposComida::orderBy('id')->get();
        $insumos = Insumo::orderBy('nombre')->get();

        // Cálculo de costo total por tipo de comida
        $costosPorTipo = DB::table('detalle_dietas')
            ->join('tipos_comidas', 'detalle_dietas.tipo_comida_id', '=', 'tipos_comidas.id')
            ->join('insumos', 'detalle_dietas.insumo_id', '=', 'insumos.id')
            ->select(
                'tipos_comidas.id',
                'tipos_comidas.nombre',
                DB::raw('SUM(insumos.costo_unitario * detalle_dietas.cantidad) as total')
            )
            ->where('detalle_dietas.dieta_id', $dieta->id)
            ->groupBy('tipos_comidas.id', 'tipos_comidas.nombre')
            ->get();

        return Inertia::render('dietas/edit', [
            'dieta' => $dieta,
            'tiposComida' => $tiposComida,
            'insumos' => $insumos,
            'costosPorTipo' => $costosPorTipo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dieta $dieta)
    {
        $validated = $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
            'nutriologo_id' => 'required|exists:nutriologos,id',
        ]);

        $dieta->update($validated);

        return redirect()->route('dietas.index')->with('success', 'Dieta actualizada.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dieta $dieta)
    {
        $dieta->delete();

        return redirect()->route('dietas.index')->with('success', 'Dieta eliminada.');
    }

    public function exportPdf()
    {
        $dietas = Dieta::with(['paciente.habitacion', 'nutriologo', 'detalle.tipoComida', 'detalle.insumo'])->get();

        $pdf = Pdf::loadView('dietas.pdf', ['dietas' => $dietas]);

        return $pdf->stream('dietas.pdf');
    }

    public function exportExcel()
    {
        $dietas = Dieta::with(['paciente.habitacion', 'nutriologo', 'detalle.tipoComida', 'detalle.insumo'])->get();

        return Excel::download(new DietasExport($dietas), 'dietas.xlsx');
    }
}
