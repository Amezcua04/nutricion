<?php

namespace Database\Factories;

use App\Models\Dieta;
use App\Models\Insumo;
use App\Models\TiposComida;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetalleDieta>
 */
class DetalleDietaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dieta_id' => Dieta::inRandomOrder()->first()->id ?? Dieta::factory(),
            'tipo_comida_id' => TiposComida::inRandomOrder()->first()->id ?? TiposComida::factory(),
            'insumo_id' => Insumo::inRandomOrder()->first()->id ?? Insumo::factory(),
            'cantidad' => $this->faker->randomFloat(2, 0.5, 2.0),
        ];
    }
}
