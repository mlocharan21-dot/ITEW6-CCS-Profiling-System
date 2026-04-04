<?php

namespace App\Observers;

use App\Models\Activity;
use App\Models\Schedule;

class ScheduleObserver
{
    public function created(Schedule $schedule): void
    {
        Activity::create([
            'type'        => 'schedule',
            'title'       => 'Schedule created',
            'description' => "Schedule {$schedule->id} for {$schedule->course_id} added",
        ]);
    }

    public function updated(Schedule $schedule): void
    {
        Activity::create([
            'type'        => 'schedule',
            'title'       => 'Schedule modified',
            'description' => "Schedule {$schedule->id} was updated",
        ]);
    }

    public function deleted(Schedule $schedule): void
    {
        Activity::create([
            'type'        => 'schedule',
            'title'       => 'Schedule removed',
            'description' => "Schedule {$schedule->id} was removed",
        ]);
    }
}
