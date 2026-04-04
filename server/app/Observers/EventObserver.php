<?php

namespace App\Observers;

use App\Models\Activity;
use App\Models\Event;

class EventObserver
{
    public function created(Event $event): void
    {
        Activity::create([
            'type'        => 'event',
            'title'       => 'Event created',
            'description' => "{$event->title} was created",
        ]);
    }

    public function updated(Event $event): void
    {
        Activity::create([
            'type'        => 'event',
            'title'       => 'Event updated',
            'description' => "{$event->title} was updated",
        ]);
    }

    public function deleted(Event $event): void
    {
        Activity::create([
            'type'        => 'event',
            'title'       => 'Event removed',
            'description' => "{$event->title} was removed",
        ]);
    }
}
