<?php

namespace App\Observers;

use App\Models\Activity;
use App\Models\Student;

class StudentObserver
{
    public function created(Student $student): void
    {
        Activity::create([
            'type'        => 'student',
            'title'       => 'New student enrolled',
            'description' => "{$student->first_name} {$student->last_name} enrolled",
        ]);
    }

    public function updated(Student $student): void
    {
        Activity::create([
            'type'        => 'student',
            'title'       => 'Student profile updated',
            'description' => "{$student->first_name} {$student->last_name} was updated",
        ]);
    }

    public function deleted(Student $student): void
    {
        Activity::create([
            'type'        => 'student',
            'title'       => 'Student removed',
            'description' => "{$student->first_name} {$student->last_name} was removed",
        ]);
    }
}
