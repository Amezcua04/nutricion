<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class PacienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->name,
            'numero_habitacion' => $this->faker->numberBetween(100, 999),
            'fecha_ingreso' => $this->faker->dateTimeBetween('-10 days', 'now'),
            'fecha_egreso' => null,
        ];
    }
}
