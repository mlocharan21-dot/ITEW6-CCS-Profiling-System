<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'CUR-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'curricula';

    protected $fillable = ['id', 'year', 'semester', 'courses', 'total_units'];

    protected $casts = ['courses' => 'array'];
}
