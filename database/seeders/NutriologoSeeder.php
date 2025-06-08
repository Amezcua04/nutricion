<?php

namespace Database\Seeders;

use App\Models\Nutriologo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NutriologoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Nutriologo::factory()->count(2)->create();
    }
}
