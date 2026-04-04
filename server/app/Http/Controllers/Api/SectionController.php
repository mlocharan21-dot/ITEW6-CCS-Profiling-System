<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        return response()->json(Section::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string',
            'year'     => 'required|integer|between:1,4',
            'semester' => 'required|string',
            'capacity' => 'required|integer',
        ]);
        $section = Section::create($data);
        return response()->json($section, 201);
    }

    public function show(Section $section)
    {
        return response()->json($section);
    }

    public function update(Request $request, Section $section)
    {
        $data = $request->validate([
            'name'     => 'sometimes|string',
            'year'     => 'sometimes|integer|between:1,4',
            'semester' => 'sometimes|string',
            'capacity' => 'sometimes|integer',
        ]);
        $section->update($data);
        return response()->json($section->fresh());
    }

    public function destroy(Section $section)
    {
        $section->delete();
        return response()->noContent();
    }
}
