<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detalle_dietas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dieta_id')->constrained('dietas');
            $table->foreignId('tipo_comida_id')->constrained('tipos_comidas');
            $table->foreignId('insumo_id')->constrained('insumos');
            $table->decimal('cantidad', 5, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_dietas');
    }
};
