<?php

namespace Database\Factories;

use App\Models\Nutriologo;
use App\Models\Paciente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dieta>
 */
class DietaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'paciente_id' => Paciente::inRandomOrder()->first()->id ?? Paciente::factory(),
            'fecha' => $this->faker->dateTimeBetween('-10 days', 'now')->format('Y-m-d'),
            'nutriologo_id' => Nutriologo::inRandomOrder()->first()->id ?? Nutriologo::factory(),
        ];
    }
}
