<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Laboratory;
use Illuminate\Http\Request;

class LaboratoryController extends Controller
{
    public function index()
    {
        return response()->json(Laboratory::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'      => 'required|string',
            'capacity'  => 'required|integer',
            'building'  => 'required|string',
            'equipment' => 'nullable|array',
        ]);
        $lab = Laboratory::create($data);
        return response()->json($lab, 201);
    }

    public function show(Laboratory $laboratory)
    {
        return response()->json($laboratory);
    }

    public function update(Request $request, Laboratory $laboratory)
    {
        $data = $request->validate([
            'name'      => 'sometimes|string',
            'capacity'  => 'sometimes|integer',
            'building'  => 'sometimes|string',
            'equipment' => 'nullable|array',
        ]);
        $laboratory->update($data);
        return response()->json($laboratory->fresh());
    }

    public function destroy(Laboratory $laboratory)
    {
        $laboratory->delete();
        return response()->noContent();
    }
}
