<?php

namespace App\Http\Controllers;

use App\Models\Nutriologo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutriologoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nutriologos = Nutriologo::latest()->paginate(5);

        return Inertia::render('nutriologos/index', [
            'nutriologos' => $nutriologos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('nutriologos/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
        ]);

        Nutriologo::create([
            'nombre' => $request->nombre,
        ]);

        return redirect()->route('nutriologos.index')->with('success', 'Nutriólogo creado.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Nutriologo $nutriologo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nutriologo $nutriologo)
    {
        return Inertia::render('nutriologos/edit', [
            'nutriologo' => $nutriologo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nutriologo $nutriologo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
        ]);

        $nutriologo->update($validated);

        return redirect()->route('nutriologos.index')->with('success', 'Nutriólogo actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nutriologo $nutriologo)
    {
        $nutriologo->delete();

        return redirect()->route('nutriologos.index')->with('success', 'Nutriólogo eliminado.');
    }
}
