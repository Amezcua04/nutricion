<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    /** @use HasFactory<\Database\Factories\InsumoFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'unidad',
        'costo_unitario'
    ];

    public function detalleDietas()
    {
        return $this->hasMany(DetalleDieta::class);
    }
}
