<?php

namespace Database\Seeders;

use App\Models\DetalleDieta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetalleDietaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DetalleDieta::factory()->count(100)->create();
    }
}
