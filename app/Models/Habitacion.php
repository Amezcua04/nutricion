<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    protected $table = 'habitaciones';
    
    protected $fillable = ['numero', 'costo_noche'];

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }
}
