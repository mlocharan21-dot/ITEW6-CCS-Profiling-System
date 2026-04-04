<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Syllabus;
use Illuminate\Http\Request;

class SyllabusController extends Controller
{
    public function index()
    {
        return response()->json(Syllabus::all()->map(fn($s) => $this->format($s)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'courseId'     => 'required|string|exists:courses,id',
            'semester'     => 'required|string',
            'academicYear' => 'required|string',
            'topics'       => 'nullable|array',
            'requirements' => 'nullable|array',
        ]);
        $syllabus = Syllabus::create([
            'course_id'     => $data['courseId'],
            'semester'      => $data['semester'],
            'academic_year' => $data['academicYear'],
            'topics'        => $data['topics'] ?? [],
            'requirements'  => $data['requirements'] ?? [],
        ]);
        return response()->json($this->format($syllabus), 201);
    }

    public function show(Syllabus $syllabus)
    {
        return response()->json($this->format($syllabus));
    }

    public function update(Request $request, Syllabus $syllabus)
    {
        $data = $request->validate([
            'courseId'     => 'sometimes|string|exists:courses,id',
            'semester'     => 'sometimes|string',
            'academicYear' => 'sometimes|string',
            'topics'       => 'nullable|array',
            'requirements' => 'nullable|array',
        ]);
        $syllabus->update(array_filter([
            'course_id'     => $data['courseId'] ?? null,
            'semester'      => $data['semester'] ?? null,
            'academic_year' => $data['academicYear'] ?? null,
            'topics'        => $data['topics'] ?? null,
            'requirements'  => $data['requirements'] ?? null,
        ], fn($v) => $v !== null));
        return response()->json($this->format($syllabus->fresh()));
    }

    public function destroy(Syllabus $syllabus)
    {
        $syllabus->delete();
        return response()->noContent();
    }

    private function format(Syllabus $s): array
    {
        return [
            'id'           => $s->id,
            'courseId'     => $s->course_id,
            'semester'     => $s->semester,
            'academicYear' => $s->academic_year,
            'topics'       => $s->topics ?? [],
            'requirements' => $s->requirements ?? [],
        ];
    }
}
