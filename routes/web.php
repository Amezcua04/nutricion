<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetalleDietaController;
use App\Http\Controllers\DietaController;
use App\Http\Controllers\InsumoController;
use App\Http\Controllers\NutriologoController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\TiposComidaController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;
use Inertia\Inertia;

// Rutas publicas
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    // Rutas para cocina
    Route::middleware(['role:cocina'])->group(function () {});

    // Rutas para nutriologo
    Route::middleware(['role:nutriologo,admin'])->group(function () {
        Route::resource('dietas', DietaController::class);
        Route::post('/detalleDieta', [DetalleDietaController::class, 'store'])->name('detalleDieta.store');
        Route::delete('/detalleDieta/{detalleDieta}', [DetalleDietaController::class, 'destroy'])->name('detalleDieta.destroy');
        Route::get('/dietas/export/pdf', [DietaController::class, 'exportPdf'])->name('dietas.export.pdf');
        Route::get('/dietas/export/excel', [DietaController::class, 'exportExcel'])->name('dietas.export.excel');
        Route::get('/reportes', [ReporteController::class, 'index'])->name('reportes.index');
        Route::get('/reportes/export/pdf', [ReporteController::class, 'exportPdf'])->name('reportes.pdf');
        Route::get('/reportes/export/excel', [ReporteController::class, 'exportExcel'])->name('reportes.excel');
    });

    // Rutas para admin
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('nutriologos', NutriologoController::class);
        Route::resource('pacientes', PacienteController::class);
        Route::resource('insumos', InsumoController::class);
        Route::resource('tiposComida', TiposComidaController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
