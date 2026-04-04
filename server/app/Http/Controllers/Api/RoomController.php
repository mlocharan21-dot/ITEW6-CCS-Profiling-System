<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return response()->json(Room::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string',
            'type'     => 'required|string',
            'capacity' => 'required|integer',
            'building' => 'required|string',
        ]);
        $room = Room::create($data);
        return response()->json($room, 201);
    }

    public function show(Room $room)
    {
        return response()->json($room);
    }

    public function update(Request $request, Room $room)
    {
        $data = $request->validate([
            'name'     => 'sometimes|string',
            'type'     => 'sometimes|string',
            'capacity' => 'sometimes|integer',
            'building' => 'sometimes|string',
        ]);
        $room->update($data);
        return response()->json($room->fresh());
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return response()->noContent();
    }
}
