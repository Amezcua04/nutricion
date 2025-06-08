<?php

namespace Database\Seeders;

use App\Models\TiposComida;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TiposComidaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = ['Desayuno', 'Comida', 'Cena', 'Colación AM', 'Colación PM'];

        foreach ($tipos as $tipo) {
            TiposComida::firstOrCreate(['nombre' => $tipo]);
        }
    }
}
