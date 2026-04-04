<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index()
    {
        return response()->json(Faculty::all()->map(fn($f) => $this->format($f)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'firstName'      => 'required|string',
            'lastName'       => 'required|string',
            'email'          => 'required|email|unique:faculty,email',
            'phone'          => 'nullable|string',
            'department'     => 'required|string',
            'position'       => 'required|string',
            'specialization' => 'nullable|string',
            'office'         => 'nullable|string',
            'status'         => 'in:active,inactive',
            'birthday'       => 'nullable|date',
            'hiredDate'      => 'nullable|date',
        ]);

        $faculty = Faculty::create([
            'first_name'     => $data['firstName'],
            'last_name'      => $data['lastName'],
            'email'          => $data['email'],
            'phone'          => $data['phone'] ?? null,
            'department'     => $data['department'],
            'position'       => $data['position'],
            'specialization' => $data['specialization'] ?? null,
            'office'         => $data['office'] ?? null,
            'status'         => $data['status'] ?? 'active',
            'birthday'       => $data['birthday'] ?? null,
            'hired_date'     => $data['hiredDate'] ?? null,
        ]);

        return response()->json($this->format($faculty), 201);
    }

    public function show(Faculty $faculty)
    {
        return response()->json($this->format($faculty));
    }

    public function update(Request $request, Faculty $faculty)
    {
        $data = $request->validate([
            'firstName'      => 'sometimes|string',
            'lastName'       => 'sometimes|string',
            'email'          => 'sometimes|email|unique:faculty,email,' . $faculty->id,
            'phone'          => 'nullable|string',
            'department'     => 'sometimes|string',
            'position'       => 'sometimes|string',
            'specialization' => 'nullable|string',
            'office'         => 'nullable|string',
            'status'         => 'in:active,inactive',
            'birthday'       => 'nullable|date',
            'hiredDate'      => 'nullable|date',
        ]);

        $faculty->update(array_filter([
            'first_name'     => $data['firstName'] ?? null,
            'last_name'      => $data['lastName'] ?? null,
            'email'          => $data['email'] ?? null,
            'phone'          => $data['phone'] ?? null,
            'department'     => $data['department'] ?? null,
            'position'       => $data['position'] ?? null,
            'specialization' => $data['specialization'] ?? null,
            'office'         => $data['office'] ?? null,
            'status'         => $data['status'] ?? null,
            'birthday'       => $data['birthday'] ?? null,
            'hired_date'     => $data['hiredDate'] ?? null,
        ], fn($v) => $v !== null));

        return response()->json($this->format($faculty->fresh()));
    }

    public function destroy(Faculty $faculty)
    {
        $faculty->delete();
        return response()->noContent();
    }

    private function format(Faculty $f): array
    {
        return [
            'id'             => $f->id,
            'firstName'      => $f->first_name,
            'lastName'       => $f->last_name,
            'email'          => $f->email,
            'phone'          => $f->phone,
            'department'     => $f->department,
            'position'       => $f->position,
            'specialization' => $f->specialization,
            'office'         => $f->office,
            'status'         => $f->status,
            'birthday'       => $f->birthday?->format('Y-m-d'),
            'hiredDate'      => $f->hired_date?->format('Y-m-d'),
        ];
    }
}
