<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Administrador
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin1234'),
            'role' => 'admin'
        ]);
        // Nutriologo
        User::create([
            'name' => 'Nutriologo',
            'email' => 'nutriologo@test.com',
            'password' => Hash::make('nutriologo1234'),
            'role' => 'nutriologo'
        ]);
        // Cocina
        User::create([
            'name' => 'Cocina',
            'email' => 'cocina@test.com',
            'password' => Hash::make('cocina1234'),
            'role' => 'cocina'
        ]);
    }
}
