<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsumoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $insumos = Insumo::latest()->paginate(8);

        return Inertia::render('insumos/index', [
            'insumos' => $insumos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('insumos/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'unidad' => 'required|string|max:50',
            'costo_unitario' => 'required|numeric|min:0',
        ]);

        Insumo::create($validated);

        return redirect()->route('insumos.index')->with('success', 'Insumo creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Insumo $insumo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Insumo $insumo)
    {
        return Inertia::render('insumos/edit', [
            'insumo' => $insumo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Insumo $insumo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'unidad' => 'required|string|max:50',
            'costo_unitario' => 'required|numeric|min:0',
        ]);

        $insumo->update($validated);

        return redirect()->route('insumos.index')->with('success', 'Insumo actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Insumo $insumo)
    {
        $insumo->delete();

        return redirect()->route('insumos.index')->with('success', 'Insumo eliminado correctamente.');
    }
}
