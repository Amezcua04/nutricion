<!-- resources/views/reportes/pdf.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Inversión</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <h2>Reporte de Inversión por Paciente</h2>
    <p>Periodo: {{ $fecha_inicio }} a {{ $fecha_fin }}</p>

    <table>
        <thead>
            <tr>
                <th>Paciente</th>
                <th>Habitación</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th># Dietas</th>
                <th>Total Inversión (MXN)</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($reporte as $r)
            <tr>
                <td>{{ $r->nombre }}</td>
                <td>{{ $r->habitacion }}</td>
                <td>{{ $r->desde }}</td>
                <td>{{ $r->hasta }}</td>
                <td>{{ $r->total_dietas }}</td>
                <td>${{ number_format($r->total_inversion, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
