<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        return response()->json(Lesson::all()->map(fn($l) => $this->format($l)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'courseId'   => 'required|string|exists:courses,id',
            'week'       => 'required|integer',
            'title'      => 'required|string',
            'objectives' => 'nullable|array',
            'activities' => 'nullable|array',
            'duration'   => 'nullable|string',
        ]);
        $lesson = Lesson::create([
            'course_id'  => $data['courseId'],
            'week'       => $data['week'],
            'title'      => $data['title'],
            'objectives' => $data['objectives'] ?? [],
            'activities' => $data['activities'] ?? [],
            'duration'   => $data['duration'] ?? null,
        ]);
        return response()->json($this->format($lesson), 201);
    }

    public function show(Lesson $lesson)
    {
        return response()->json($this->format($lesson));
    }

    public function update(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'courseId'   => 'sometimes|string|exists:courses,id',
            'week'       => 'sometimes|integer',
            'title'      => 'sometimes|string',
            'objectives' => 'nullable|array',
            'activities' => 'nullable|array',
            'duration'   => 'nullable|string',
        ]);
        $lesson->update(array_filter([
            'course_id'  => $data['courseId'] ?? null,
            'week'       => $data['week'] ?? null,
            'title'      => $data['title'] ?? null,
            'objectives' => $data['objectives'] ?? null,
            'activities' => $data['activities'] ?? null,
            'duration'   => $data['duration'] ?? null,
        ], fn($v) => $v !== null));
        return response()->json($this->format($lesson->fresh()));
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return response()->noContent();
    }

    private function format(Lesson $l): array
    {
        return [
            'id'         => $l->id,
            'courseId'   => $l->course_id,
            'week'       => $l->week,
            'title'      => $l->title,
            'objectives' => $l->objectives ?? [],
            'activities' => $l->activities ?? [],
            'duration'   => $l->duration,
        ];
    }
}
