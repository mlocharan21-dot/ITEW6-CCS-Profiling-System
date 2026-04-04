<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FacultyAssignment;
use Illuminate\Http\Request;

class FacultyAssignmentController extends Controller
{
    public function index()
    {
        return response()->json(FacultyAssignment::all()->map(fn($fa) => $this->format($fa)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'facultyId'    => 'required|string|exists:faculty,id',
            'courseId'     => 'required|string|exists:courses,id',
            'sectionId'    => 'required|string|exists:sections,id',
            'academicYear' => 'required|string',
            'semester'     => 'required|string',
        ]);
        $assignment = FacultyAssignment::create([
            'faculty_id'    => $data['facultyId'],
            'course_id'     => $data['courseId'],
            'section_id'    => $data['sectionId'],
            'academic_year' => $data['academicYear'],
            'semester'      => $data['semester'],
        ]);
        return response()->json($this->format($assignment), 201);
    }

    public function show(FacultyAssignment $facultyAssignment)
    {
        return response()->json($this->format($facultyAssignment));
    }

    public function update(Request $request, FacultyAssignment $facultyAssignment)
    {
        $data = $request->validate([
            'facultyId'    => 'sometimes|string|exists:faculty,id',
            'courseId'     => 'sometimes|string|exists:courses,id',
            'sectionId'    => 'sometimes|string|exists:sections,id',
            'academicYear' => 'sometimes|string',
            'semester'     => 'sometimes|string',
        ]);
        $facultyAssignment->update(array_filter([
            'faculty_id'    => $data['facultyId'] ?? null,
            'course_id'     => $data['courseId'] ?? null,
            'section_id'    => $data['sectionId'] ?? null,
            'academic_year' => $data['academicYear'] ?? null,
            'semester'      => $data['semester'] ?? null,
        ], fn($v) => $v !== null));
        return response()->json($this->format($facultyAssignment->fresh()));
    }

    public function destroy(FacultyAssignment $facultyAssignment)
    {
        $facultyAssignment->delete();
        return response()->noContent();
    }

    private function format(FacultyAssignment $fa): array
    {
        return [
            'id'           => $fa->id,
            'facultyId'    => $fa->faculty_id,
            'courseId'     => $fa->course_id,
            'sectionId'    => $fa->section_id,
            'academicYear' => $fa->academic_year,
            'semester'     => $fa->semester,
        ];
    }
}
