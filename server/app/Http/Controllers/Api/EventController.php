<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return response()->json(Event::all()->map(fn($e) => $this->format($e)));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'date'        => 'required|date',
            'time'        => 'required',
            'location'    => 'required|string',
            'category'    => 'required|in:curricular,extra-curricular',
            'organizer'   => 'nullable|string',
        ]);
        $event = Event::create($data);
        return response()->json($this->format($event), 201);
    }

    public function show(Event $event)
    {
        return response()->json($this->format($event));
    }

    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'title'       => 'sometimes|string',
            'description' => 'nullable|string',
            'date'        => 'sometimes|date',
            'time'        => 'sometimes',
            'location'    => 'sometimes|string',
            'category'    => 'in:curricular,extra-curricular',
            'organizer'   => 'nullable|string',
        ]);
        $event->update($data);
        return response()->json($this->format($event->fresh()));
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->noContent();
    }

    private function format(Event $e): array
    {
        return [
            'id'          => $e->id,
            'title'       => $e->title,
            'description' => $e->description,
            'date'        => $e->date?->format('Y-m-d'),
            'time'        => substr($e->time, 0, 5), // HH:MM
            'location'    => $e->location,
            'category'    => $e->category,
            'organizer'   => $e->organizer,
        ];
    }
}
