<?php

namespace App\Http\Controllers;

use App\Models\DetalleDieta;
use Illuminate\Http\Request;

class DetalleDietaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'dieta_id' => 'required|exists:dietas,id',
            'tipo_comida_id' => 'required|exists:tipos_comidas,id',
            'insumo_id' => 'required|exists:insumos,id',
            'cantidad' => 'required|numeric|min:0.1',
        ]);

        // Validar que no haya más de 5 registros únicos por dieta_id y tipo_comida_id
        $conteo = DetalleDieta::where('dieta_id', $validated['dieta_id'])
            ->where('tipo_comida_id', $validated['tipo_comida_id'])
            ->count();

        if ($conteo >= 10) {
            return back()->withErrors([
                'general' => 'No se pueden asignar más de 10 insumos por tipo de comida en una dieta.',
            ]);
        }

        // Evitar duplicados exactos
        $existe = DetalleDieta::where('dieta_id', $validated['dieta_id'])
            ->where('tipo_comida_id', $validated['tipo_comida_id'])
            ->where('insumo_id', $validated['insumo_id'])
            ->exists();

        if ($existe) {
            return back()->withErrors([
                'general' => 'Ese insumo ya fue asignado a este tipo de comida en la dieta.',
            ]);
        }

        DetalleDieta::create($validated);

        return back()->with('success', 'Insumo asignado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DetalleDieta $detalleDieta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetalleDieta $detalleDieta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DetalleDieta $detalleDieta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetalleDieta $detalleDieta)
    {
        $detalleDieta->delete();

        return back()->with('success', 'Insumo eliminado de la dieta.');
    }
}
