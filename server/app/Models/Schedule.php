<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'SCH-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'course_id', 'section_id', 'faculty_id', 'room_id',
        'day', 'start_time', 'end_time',
    ];
}
