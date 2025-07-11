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
                <th>Tipo Estancia</th>
                <th>Habitación</th>
                <th>Costo</th>
                <th>Estancia</th>
                <th>Costo Estancia</th>
                <th>Total Alimentos</th>
                <th>Diferencia</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($reporte as $r)
            <tr>
                <td>{{ $r->nombre }}</td>
                <td>{{ $r->tipo }}</td>
                <td>{{ $r->habitacion }}</td>
                <td>{{ $r->costo }}</td>
                <td>{{ $r->estancia }}</td>
                <td>{{ $r->costo_estancia }}</td>
                <td>{{ $r->total_alimentos }}</td>
                <td>{{ $r->diferencia }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
