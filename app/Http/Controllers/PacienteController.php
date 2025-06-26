<?php

namespace App\Http\Controllers;

use App\Models\Habitacion;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        $pacientes = Paciente::with('habitacion')
            ->when($search, function ($query, $search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhereHas('habitacion', function ($q) use ($search) {
                        $q->where('numero', 'like', "%{$search}%");
                    });
            })
            ->orderBy($sort, $direction)
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('pacientes/index', [
            'pacientes' => $pacientes,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pacientes/create', [
            'habitaciones' => Habitacion::select('id', 'numero', 'costo_noche')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'habitacion_id' => 'required|exists:habitaciones,id',
            'fecha_ingreso' => 'required|date',
        ]);

        Paciente::create($validated);

        return redirect()->route('pacientes.index')->with('success', 'Paciente creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        return Inertia::render('pacientes/edit', [
            'paciente' => $paciente->load('habitacion'),
            'habitaciones' => Habitacion::select('id', 'numero', 'costo_noche')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'habitacion_id' => 'required|exists:habitaciones,id',
            'fecha_ingreso' => 'required|date',
            'fecha_egreso' => 'nullable|date|after_or_equal:fecha_ingreso',
        ]);

        $paciente->update($validated);

        return redirect()->route('pacientes.index')->with('success', 'Paciente actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        $paciente->delete();

        return redirect()->route('pacientes.index')->with('success', 'Paciente eliminado correctamente.');
    }
}
