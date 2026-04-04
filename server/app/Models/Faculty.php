<?php

namespace App\Models;

use App\Traits\GeneratesStringId;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use GeneratesStringId;

    public static string $idPrefix = 'FAC-';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'faculty';

    protected $fillable = [
        'id', 'first_name', 'last_name', 'email', 'phone',
        'department', 'position', 'specialization', 'office',
        'status', 'birthday', 'hired_date',
    ];

    protected $casts = [
        'birthday'    => 'date:Y-m-d',
        'hired_date'  => 'date:Y-m-d',
    ];
}
