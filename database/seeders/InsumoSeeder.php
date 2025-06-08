<?php

namespace Database\Seeders;

use App\Models\Insumo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Insumo::factory()->count(20)->create();
    }
}
