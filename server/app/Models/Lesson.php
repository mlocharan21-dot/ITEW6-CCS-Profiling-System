<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'LES-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'course_id', 'week', 'title', 'objectives', 'activities', 'duration',
    ];

    protected $casts = [
        'objectives' => 'array',
        'activities' => 'array',
    ];
}
