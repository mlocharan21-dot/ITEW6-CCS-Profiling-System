<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(Course::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id'          => 'required|string|unique:courses,id',
            'name'        => 'required|string',
            'units'       => 'required|integer',
            'description' => 'nullable|string',
            'department'  => 'required|string',
        ]);
        $course = Course::create($data);
        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        return response()->json($course);
    }

    public function update(Request $request, Course $course)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string',
            'units'       => 'sometimes|integer',
            'description' => 'nullable|string',
            'department'  => 'sometimes|string',
        ]);
        $course->update($data);
        return response()->json($course->fresh());
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->noContent();
    }
}
