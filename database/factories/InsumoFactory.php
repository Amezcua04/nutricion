<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Insumo>
 */
class InsumoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => ucfirst($this->faker->word),
            'unidad' => $this->faker->randomElement(['porción', 'gramos', 'pieza']),
            'costo_unitario' => $this->faker->randomFloat(2, 5, 50),
        ];
    }
}
