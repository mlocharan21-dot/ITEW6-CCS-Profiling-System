<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Course;
use App\Models\Event;
use App\Models\Faculty;
use App\Models\Student;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'totalStudents'         => Student::count(),
            'activeStudents'        => Student::where('status', 'active')->count(),
            'totalFaculty'          => Faculty::count(),
            'activeFaculty'         => Faculty::where('status', 'active')->count(),
            'totalCourses'          => Course::count(),
            'totalEvents'           => Event::count(),
            'curricularEvents'      => Event::where('category', 'curricular')->count(),
            'extraCurricularEvents' => Event::where('category', 'extra-curricular')->count(),
        ]);
    }

    public function activities()
    {
        return response()->json(
            Activity::latest()->take(10)->get()->map(fn($a) => [
                'id'          => $a->id,
                'type'        => $a->type,
                'title'       => $a->title,
                'description' => $a->description,
                'time'        => $a->created_at->diffForHumans(),
            ])
        );
    }
}
