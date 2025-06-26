<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte de Dietas</title>
  <style>
    body { font-family: sans-serif; font-size: 12px; }
    h2 { margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
    th { background-color: #f2f2f2; }
    .section { margin-top: 20px; }
  </style>
</head>
<body>
  <h2>Reporte de Dietas</h2>

  @foreach ($dietas as $dieta)
    <div class="section">
      <strong>Paciente:</strong> {{ $dieta->paciente->nombre }} <br>
      <strong>Habitación:</strong> {{ $dieta->paciente->habitacion->numero ?? 'N/A' }} <br>
      <strong>Nutriólogo:</strong> {{ $dieta->nutriologo->nombre }} <br>
      <strong>Fecha:</strong> {{ $dieta->fecha }}

      <table>
        <thead>
          <tr>
            <th>Tipo de Comida</th>
            <th>Insumo</th>
            <th>Cantidad</th>
            <th>Costo Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          @php
            $total = 0;
            $agrupados = $dieta->detalle->groupBy(fn ($d) => $d->tipoComida->nombre);
          @endphp

          @foreach ($agrupados as $tipoNombre => $detalles)
            @php $first = true; @endphp
            @foreach ($detalles as $detalle)
              @php
                $subtotal = $detalle->cantidad * $detalle->insumo->costo_unitario;
                $total += $subtotal;
              @endphp
              <tr>
                <td>{{ $first ? $tipoNombre : '' }}</td>
                <td>{{ $detalle->insumo->nombre }}</td>
                <td>{{ $detalle->cantidad }}</td>
                <td>${{ number_format($detalle->insumo->costo_unitario, 2) }}</td>
                <td>${{ number_format($subtotal, 2) }}</td>
              </tr>
              @php $first = false; @endphp
            @endforeach
          @endforeach

          <tr>
            <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
            <td><strong>${{ number_format($total, 2) }}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  @endforeach
</body>
</html>
