<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nutriologo extends Model
{
    /** @use HasFactory<\Database\Factories\NutriologoFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre',
        'usuario',
    ];

    public function dietas()
    {
        return $this->hasMany(Dieta::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
