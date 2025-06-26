<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    /** @use HasFactory<\Database\Factories\PacienteFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'numero_habitacion',
        'fecha_ingreso',
        'fecha_egreso',
    ];

    public function dietas()
    {
        return $this->hasMany(Dieta::class);
    }

    public function habitacion()
    {
        return $this->belongsTo(Habitacion::class);
    }
}
