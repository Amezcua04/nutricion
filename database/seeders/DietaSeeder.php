<?php

namespace Database\Seeders;

use App\Models\Dieta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DietaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dieta::factory()->count(30)->create();
    }
}
