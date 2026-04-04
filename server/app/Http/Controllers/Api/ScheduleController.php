<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        return response()->json(Schedule::all()->map(fn($s) => $this->format($s)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'courseId'   => 'required|string|exists:courses,id',
            'sectionId'  => 'required|string|exists:sections,id',
            'facultyId'  => 'required|string|exists:faculty,id',
            'roomId'     => 'required|string',
            'day'        => 'required|string',
            'startTime'  => 'required',
            'endTime'    => 'required',
        ]);
        $schedule = Schedule::create([
            'course_id'  => $data['courseId'],
            'section_id' => $data['sectionId'],
            'faculty_id' => $data['facultyId'],
            'room_id'    => $data['roomId'],
            'day'        => $data['day'],
            'start_time' => $data['startTime'],
            'end_time'   => $data['endTime'],
        ]);
        return response()->json($this->format($schedule), 201);
    }

    public function show(Schedule $schedule)
    {
        return response()->json($this->format($schedule));
    }

    public function update(Request $request, Schedule $schedule)
    {
        $data = $request->validate([
            'courseId'  => 'sometimes|string|exists:courses,id',
            'sectionId' => 'sometimes|string|exists:sections,id',
            'facultyId' => 'sometimes|string|exists:faculty,id',
            'roomId'    => 'sometimes|string',
            'day'       => 'sometimes|string',
            'startTime' => 'sometimes',
            'endTime'   => 'sometimes',
        ]);
        $schedule->update(array_filter([
            'course_id'  => $data['courseId'] ?? null,
            'section_id' => $data['sectionId'] ?? null,
            'faculty_id' => $data['facultyId'] ?? null,
            'room_id'    => $data['roomId'] ?? null,
            'day'        => $data['day'] ?? null,
            'start_time' => $data['startTime'] ?? null,
            'end_time'   => $data['endTime'] ?? null,
        ], fn($v) => $v !== null));
        return response()->json($this->format($schedule->fresh()));
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->noContent();
    }

    private function format(Schedule $s): array
    {
        return [
            'id'        => $s->id,
            'courseId'  => $s->course_id,
            'sectionId' => $s->section_id,
            'facultyId' => $s->faculty_id,
            'roomId'    => $s->room_id,
            'day'       => $s->day,
            'startTime' => substr($s->start_time, 0, 5),
            'endTime'   => substr($s->end_time, 0, 5),
        ];
    }
}
