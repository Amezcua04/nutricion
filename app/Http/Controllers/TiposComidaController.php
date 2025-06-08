<?php

namespace App\Http\Controllers;

use App\Models\TiposComida;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiposComidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos = TiposComida::orderBy('id')->paginate(10);

        return Inertia::render('tiposComida/index', [
            'tipos' => $tipos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tiposComida/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:tipos_comidas,nombre',
        ]);

        TiposComida::create($validated);

        return redirect()->route('tiposComida.index')->with('success', 'Tipo de comida creado.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TiposComida $tiposComida)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TiposComida $tiposComida)
    {
        return Inertia::render('tiposComida/edit', [
            'tipo' => $tiposComida,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TiposComida $tiposComida)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:tipos_comidas,nombre,' . $tiposComida->id,
        ]);

        $tiposComida->update($validated);

        return redirect()->route('tiposComida.index')->with('success', 'Tipo de comida actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TiposComida $tiposComida)
    {
        $tiposComida->delete();

        return redirect()->route('tiposComida.index')->with('success', 'Tipo de comida eliminado.');
    }
}
