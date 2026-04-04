<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(Student::all()->map(fn($s) => $this->format($s)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'firstName'    => 'required|string',
            'lastName'     => 'required|string',
            'email'        => 'required|email|unique:students,email',
            'phone'        => 'nullable|string',
            'year'         => 'required|integer|between:1,4',
            'section'      => 'required|string',
            'status'       => 'in:active,inactive',
            'address'      => 'nullable|string',
            'birthday'     => 'nullable|date',
            'enrolledDate' => 'nullable|date',
        ]);

        $student = Student::create([
            'first_name'    => $data['firstName'],
            'last_name'     => $data['lastName'],
            'email'         => $data['email'],
            'phone'         => $data['phone'] ?? null,
            'year'          => $data['year'],
            'section'       => $data['section'],
            'status'        => $data['status'] ?? 'active',
            'address'       => $data['address'] ?? null,
            'birthday'      => $data['birthday'] ?? null,
            'enrolled_date' => $data['enrolledDate'] ?? null,
        ]);

        return response()->json($this->format($student), 201);
    }

    public function show(Student $student)
    {
        return response()->json($this->format($student));
    }

    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'firstName'    => 'sometimes|string',
            'lastName'     => 'sometimes|string',
            'email'        => 'sometimes|email|unique:students,email,' . $student->id,
            'phone'        => 'nullable|string',
            'year'         => 'sometimes|integer|between:1,4',
            'section'      => 'sometimes|string',
            'status'       => 'in:active,inactive',
            'address'      => 'nullable|string',
            'birthday'     => 'nullable|date',
            'enrolledDate' => 'nullable|date',
        ]);

        $student->update(array_filter([
            'first_name'    => $data['firstName'] ?? null,
            'last_name'     => $data['lastName'] ?? null,
            'email'         => $data['email'] ?? null,
            'phone'         => $data['phone'] ?? null,
            'year'          => $data['year'] ?? null,
            'section'       => $data['section'] ?? null,
            'status'        => $data['status'] ?? null,
            'address'       => $data['address'] ?? null,
            'birthday'      => $data['birthday'] ?? null,
            'enrolled_date' => $data['enrolledDate'] ?? null,
        ], fn($v) => $v !== null));

        return response()->json($this->format($student->fresh()));
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return response()->noContent();
    }

    private function format(Student $s): array
    {
        return [
            'id'           => $s->id,
            'firstName'    => $s->first_name,
            'lastName'     => $s->last_name,
            'email'        => $s->email,
            'phone'        => $s->phone,
            'year'         => $s->year,
            'section'      => $s->section,
            'status'       => $s->status,
            'address'      => $s->address,
            'birthday'     => $s->birthday?->format('Y-m-d'),
            'enrolledDate' => $s->enrolled_date?->format('Y-m-d'),
        ];
    }
}
