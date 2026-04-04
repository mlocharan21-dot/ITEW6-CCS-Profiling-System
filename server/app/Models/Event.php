<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'EVT-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'title', 'description', 'date', 'time',
        'location', 'category', 'organizer',
    ];

    protected $casts = ['date' => 'date:Y-m-d'];
}
