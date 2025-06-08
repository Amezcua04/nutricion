<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposComida extends Model
{
    /** @use HasFactory<\Database\Factories\TiposComidaFactory> */
    use HasFactory;

    protected $table = 'tipos_comidas';

    protected $fillable = ['nombre'];

    public function detalleDietas()
    {
        return $this->hasMany(DetalleDieta::class);
    }
}
