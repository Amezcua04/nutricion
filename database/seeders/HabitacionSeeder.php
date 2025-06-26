<?php

namespace Database\Seeders;

use App\Models\Habitacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HabitacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Habitacion::create([
            'numero' => '201',
            'costo_noche' => 100,
        ]);
    }
}
