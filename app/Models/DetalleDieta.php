<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleDieta extends Model
{
    /** @use HasFactory<\Database\Factories\DetalleDietaFactory> */
    use HasFactory;

    protected $table = 'detalle_dietas';

    protected $fillable = [
        'dieta_id',
        'tipo_comida_id',
        'insumo_id',
        'cantidad'
    ];

    public function dieta()
    {
        return $this->belongsTo(Dieta::class);
    }

    public function tipoComida()
    {
        return $this->belongsTo(TiposComida::class);
    }

    public function insumo()
    {
        return $this->belongsTo(Insumo::class);
    }
}
