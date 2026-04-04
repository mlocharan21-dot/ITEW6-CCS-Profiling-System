<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Syllabus extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'SYL-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'syllabi';

    protected $fillable = [
        'id', 'course_id', 'semester', 'academic_year', 'topics', 'requirements',
    ];

    protected $casts = [
        'topics'       => 'array',
        'requirements' => 'array',
    ];
}
