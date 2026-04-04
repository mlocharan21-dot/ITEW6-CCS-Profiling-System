<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class FacultyAssignment extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'FA-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'faculty_id', 'course_id', 'section_id', 'academic_year', 'semester',
    ];
}
