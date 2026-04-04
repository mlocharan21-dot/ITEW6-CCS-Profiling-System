<?php

namespace App\Observers;

use App\Models\Activity;
use App\Models\Faculty;

class FacultyObserver
{
    public function created(Faculty $faculty): void
    {
        Activity::create([
            'type'        => 'faculty',
            'title'       => 'New faculty added',
            'description' => "{$faculty->first_name} {$faculty->last_name} added",
        ]);
    }

    public function updated(Faculty $faculty): void
    {
        Activity::create([
            'type'        => 'faculty',
            'title'       => 'Faculty profile updated',
            'description' => "{$faculty->first_name} {$faculty->last_name} was updated",
        ]);
    }

    public function deleted(Faculty $faculty): void
    {
        Activity::create([
            'type'        => 'faculty',
            'title'       => 'Faculty removed',
            'description' => "{$faculty->first_name} {$faculty->last_name} was removed",
        ]);
    }
}
