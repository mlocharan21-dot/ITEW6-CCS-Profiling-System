<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Curriculum;
use Illuminate\Http\Request;

class CurriculumController extends Controller
{
    public function index()
    {
        return response()->json(Curriculum::all()->map(fn($c) => $this->format($c)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'year'       => 'required|integer|between:1,4',
            'semester'   => 'required|string',
            'courses'    => 'nullable|array',
            'totalUnits' => 'required|integer',
        ]);
        $curriculum = Curriculum::create([
            'year'        => $data['year'],
            'semester'    => $data['semester'],
            'courses'     => $data['courses'] ?? [],
            'total_units' => $data['totalUnits'],
        ]);
        return response()->json($this->format($curriculum), 201);
    }

    public function show(Curriculum $curriculum)
    {
        return response()->json($this->format($curriculum));
    }

    public function update(Request $request, Curriculum $curriculum)
    {
        $data = $request->validate([
            'year'       => 'sometimes|integer|between:1,4',
            'semester'   => 'sometimes|string',
            'courses'    => 'nullable|array',
            'totalUnits' => 'sometimes|integer',
        ]);
        $curriculum->update(array_filter([
            'year'        => $data['year'] ?? null,
            'semester'    => $data['semester'] ?? null,
            'courses'     => $data['courses'] ?? null,
            'total_units' => $data['totalUnits'] ?? null,
        ], fn($v) => $v !== null));
        return response()->json($this->format($curriculum->fresh()));
    }

    public function destroy(Curriculum $curriculum)
    {
        $curriculum->delete();
        return response()->noContent();
    }

    private function format(Curriculum $c): array
    {
        return [
            'id'         => $c->id,
            'year'       => $c->year,
            'semester'   => $c->semester,
            'courses'    => $c->courses ?? [],
            'totalUnits' => $c->total_units,
        ];
    }
}
