<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dieta extends Model
{
    /** @use HasFactory<\Database\Factories\DietaFactory> */
    use HasFactory;

    protected $fillable = [
        'paciente_id',
        'fecha',
        'nutriologo_id'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function nutriologo()
    {
        return $this->belongsTo(Nutriologo::class);
    }

    public function detalle()
    {
        return $this->hasMany(DetalleDieta::class);
    }
}
